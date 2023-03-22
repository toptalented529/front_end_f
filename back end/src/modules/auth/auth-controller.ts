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
import { UsersService } from '../users/users-service';
const { OAuth2Client } = require("google-auth-library");

export class AuthController implements IBaseController {
  public routerPrefix = '/auth';

  public constructor(
    private readonly _authService: AuthService,
    private readonly _userRefreshTokensService: UserRefreshTokensService,
    private readonly _userContext: UserContextService,
    private readonly _logger: ILoggerService,
    private readonly _usersService:UsersService
    
  ) {

  }

  public client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
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
    });
    app.post('/signupWithGoogle', {
      handler: this._signupGoogle,
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
    app.post('/set-space', {
      handler: this._setSpace,
      preValidation: [app.verifyJwtAccessToken],
    });
    app.post('/set-business', {
      handler: this._setBusiness,
      preValidation: [app.verifyJwtRefreshToken],
    });
    app.post('/set-address', {
      handler: this._setAddress,
      preValidation: [app.verifyJwtRefreshToken],
    });
    app.post('/set-timezone', {
      handler: this._setTimezone,
      preValidation: [app.verifyJwtRefreshToken],
    });
    app.post('/set-payment', {
      handler: this._setPayment,
      preValidation: [app.verifyJwtRefreshToken],
    });
  }

  private _signup =async (req:any,res:any)  => {

    const {username,email,password} = req.body
    const verificationcode = randomstring.generate(6);
    console.log(username,email,password,verificationcode)
    const JWT:any = await this._authService.createUser(
      convertToObjectOrEmptyObject<ISignUpDto>({
        username: username,
        email:email,
        password: password,
        verificationcode:verificationcode,
        is_verified:false,
        
      }),
    );
    if(JWT !== null) {
      await this._sendVerificatinCode(email,verificationcode);
  
      res.status(200).send({jwt:JWT,success:true})
    }else {
      res.status(200).send({jwt:JWT,success:false})
    }

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

  ////////////if email verified, is_verified will be true ////////////////////////

  private _verifyEmail = async (req:any,res:any) => {
    const {token} = req.body;
    console.log("3333333333333333333",token)
    const user = this._authService.emailVerify(token)
    if(user){
      res.status(200).send({success:true,user:user})
    }else{
      res.status(400)
    }


  }

  private _signupGoogle = async (req:any,res:any) => {
    try {
      if (req.body.credential) {
        const verificationResponse = await this.verifyGoogleToken(req.body.credential);
  
        if (verificationResponse.error) {
          return res.status(400).json({
            message: verificationResponse.error,
          });
        }
  
        const profile = verificationResponse?.payload;
        console.log("12121212",profile)
        let JWT:any;
        let signUpFlag:boolean = false;
        // DB.push(profile);
        const user = await this._authService.getById(profile?.email)
        console.log("1313131313",user)
        if(!user){
          JWT= await this._authService.createUser(
            convertToObjectOrEmptyObject<ISignUpDto>({
              username: profile?.given_name,
              email:profile?.email,
              password: "123456789",
              verificationcode:"",
              is_verified:true,
            }),
          );
          signUpFlag = true

        }else if(!user.is_verified){
         const users = await this._authService.emailVerify(user.verificationcode)
          JWT = await this._authService.singInGoogle(profile?.email) 
          signUpFlag = false
        }
        else{
          JWT = await this._authService.singInGoogle(profile?.email) 
          signUpFlag = false
        }
        
        res.status(200).send({
          message: "Signup was successful",
          user: {
            firstName: profile?.given_name,
            lastName: profile?.family_name,
            picture: profile?.picture,
            email: profile?.email,
            token: JWT,
            signUpFlag
          },
        });
      }
    } catch (error) {
      res.status(500).send({
        message: "An error occured. Registration failed.",
      });
    }

  }

  private  verifyGoogleToken = async (token:string) => {
    try {
      const ticket = await this.client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      return { payload: ticket.getPayload() };
    } catch (error) {
      return { error: "Invalid user detected. Please try again" };
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
  private _setSpace = async ( req:any, res:any) => {
    
    const {space} = req.body;
    const user = this._userContext.get();
    const updated_user = await this._usersService.setSpaceForUser(user.id,space)
    console.log("hsdfsdf",updated_user)
    res.status(200).send({space:updated_user?.space})

  }
  private _setBusiness = async ( req:any, res:any) => {
    
    const {business} = req.body;
    const user = this._userContext.get();
    const updated_user = await this._usersService.setBusinessForUser(user.id,business)
    console.log("hsdfsdf",updated_user)
    res.status(200).send({business:updated_user?.business})

  }

  //////set user email, phone number and addrss to DB ////////////////////////
  private _setAddress = async ( req:any, res:any) => {
    
    const {email,phone,address} = req.body;
    const user = this._userContext.get();
    const updated_user = await this._usersService.setAddress(user.id,email,phone,address)
    console.log("hsdfsdf",updated_user)
    res.status(200).send({address:updated_user?.address})

  }
  //set timezone and language to DB //////////////////
  private _setTimezone = async ( req:any, res:any) => {
    
    const {language,timezone} = req.body;
    const user = this._userContext.get();
    const updated_user = await this._usersService.setTimezone(user.id,language,timezone)
    console.log("hsdfsdf",updated_user)
    res.status(200).send({timezone:updated_user?.timezone})

  }
  private _setPayment = async ( req:any, res:any) => {
    
    const {payment} = req.body;
    const user = this._userContext.get();
    const updated_user = await this._usersService.setPayment(user.id,payment)
    console.log("hsdfsdf",updated_user)
    res.status(200).send({payment:updated_user?.payment})

  }
}
