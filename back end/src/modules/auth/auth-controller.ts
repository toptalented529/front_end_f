import { FastifyInstance, FastifyPluginOptions, FastifyRequest } from 'fastify';

import { convertToObjectOrEmptyObject } from '../../common/utils/common';
import { ISuccess } from '../../common/interfaces/responce-interface';
import { IBaseController } from '../../common/interfaces/base-controller-interface';
import { UserContextService } from '../../common/infra/auth/user-context-service';
import { ILoggerService } from '../../common/interfaces/logger-service-interface';
import { UserRefreshTokensService } from '../users-refresh-tokens/user-refresh-tokens-service';
import { IJwtTokensDto, IQueryParamsLogout, ISignInDto, ISignUpBodyDto, ISignUpDto } from './auth-interfaces';
import { AuthService } from './auth-service';
import { authSchemas } from './auth-schemas';
import { transporter } from '../../configs/nodemailer';
import randomstring from 'randomstring'


export class AuthController implements IBaseController {
  public routerPrefix = '/auth';

  public constructor(
    private readonly _authService: AuthService,
    private readonly _userRefreshTokensService: UserRefreshTokensService,
    private readonly _userContext: UserContextService,
    private readonly _logger: ILoggerService,
  ) {}

  public initRouter(app: FastifyInstance, opts: FastifyPluginOptions): void {


    app.post('/signup', {
      handler: this._signup,
    });
    app.post('/verify-email', {
      handler: this._verifyEmail,
      preValidation: [app.verifyJwtRefreshToken],

    });
    app.post('/signin', {
      handler: this._signin,
      schema: authSchemas.signin,
    });
    app.get('/logout', {
      handler: this._logout,
      schema: authSchemas.logout,
      preValidation: [app.verifyJwtRefreshToken],
    });
    app.get('/refresh', {
      handler: this._refreshTokens,
      schema: authSchemas.refresh,
      preValidation: [app.verifyJwtRefreshToken],
    });
  }

  private _signup =async (req:any,res:any)  => {
    const {username,email,password} = req.body
    const verificationCode = randomstring.generate(6);
    console.log(username,email,password,verificationCode)
    const JWT:IJwtTokensDto = await this._authService.createUser(
      convertToObjectOrEmptyObject<ISignUpDto>({
        username: username,
        email:email,
        password: password,
        verificationCode:verificationCode,
      }),
    );
      await this._sendVerificatinCode(email,verificationCode);
      console.log("2222222222222222",JWT)
    res.status(200).send({jwt:JWT,success:true})

  };

  
  private _sendVerificatinCode = async (recipient:string, code:string) => {
    const mailOptions = {
      from: 'work.katashi@gmail.com',
      to: recipient,
      subject: 'Verification Code',
      text: `Your verification code is ${code}.`,
      html: `<p>Hello,</p><p>Your verification code is <strong>${code}</strong>.</p><p>Please click on the following link to verify your email:</p><p><a href="http://localhost:3000/verify-email?token=${code}">Verify Email</a></p>`,

    };
  
    try {
      await transporter.sendMail(mailOptions);
      console.log(`Verification code email sent to ${recipient}`);
    } catch (err) {
      console.error(`Error sending verification code email to ${recipient}:`, err);
    }

  } 

  private _verifyEmail = async (req:any,res:any) => {
    const {token} = req.body;
    const user = this._authService.emailVerify(token)
    if(user){
      res.status(200).send({success:true,user:user})
    }else{
      res.status(400)
    }


  }
  private _signin = ({ body }: FastifyRequest<{ Body: ISignInDto }>): Promise<IJwtTokensDto> => {
    this._logger.debug('_signin start!');
    return this._authService.singInUser(convertToObjectOrEmptyObject(body));
  };

  private _logout = (req: FastifyRequest<{ Querystring: IQueryParamsLogout }>): Promise<ISuccess> => {
    this._logger.debug('_logout start!');
    const user = this._userContext.get();
    this._logger.debug(user);
    return this._userRefreshTokensService.deleteOneOrAll(user.refreshTokenId, req.query?.all ? user.id : null);
  };

  private _refreshTokens = (): Promise<{ token: string }> => {
    this._logger.debug('_refreshTokens start!');
    const user = this._userContext.get();
    this._logger.debug(user);
    return this._authService.refreshTokens({
      refreshTokenId: user.refreshTokenId,
      id: user.id,
    });
  };
}
