import jwt from 'jsonwebtoken';

import { jwtConfig } from '../../configs';
import { BadRequestException, ForbiddenException } from '../../common/errors/common';

import {
  IJwtAccessTokenPayloadDto,
  IJwtRefreshTokenPayloadDto,
  IJwtTokensDto,
  ISignInDto,
  ISignUpDto,
} from './auth-interfaces';
import { IUsersDto } from '../users/users-interfaces';
import { HashService } from './hash-service';
import { UsersService } from '../users/users-service';
import { UserRefreshTokensService } from '../users-refresh-tokens/user-refresh-tokens-service';
import { IUserRefreshTokensDto } from '../users-refresh-tokens/user-refresh-tokens-interfaces';

export class AuthService {
  constructor(
    private readonly _usersService: UsersService,
    private readonly _hashService: HashService,
    private readonly _userRefreshTokensService: UserRefreshTokensService,
  ) {}

//////////////if user doesn't exist create DB and send verification link and if the user exist but not verified  , only send verification code./////////////

  public createUser = async ({ username,email, password,verificationcode,is_verified }: ISignUpDto): Promise<IJwtTokensDto | null> => {
    const newPassword = await this._hashService.getHash(password);
    const existingUser = await this._usersService.getByEmail(email);
    console.log("22222222222222222",existingUser)
    if(!existingUser){
      const user = await this._usersService.createOne({
        username,
        email,
        password: newPassword,
        verificationcode,
        is_verified,
      });
      const refreshToken = await this._userRefreshTokensService.generateAndCreateOne(user.id);
      return this._generateTokens(user, refreshToken);
      
    }else if(!existingUser.is_verified){
      const refreshToken = await this._userRefreshTokensService.generateAndCreateOne(existingUser.id);
      return this._generateTokens(existingUser, refreshToken);    
    }


    // const refreshToken = await this._userRefreshTokensService.generateAndCreateOne(existingUser.id);
    // return this._generateTokens(existingUser, refreshToken);
      return null
  };

  public getById = async (email:string) => {
    return this._usersService.getByEmail(email)
  }

  public singInUser = async ({ email, password }: ISignInDto) => {
    const user = await this._usersService.getByEmail(email);

    if (!user) throw new BadRequestException('Incorrect credentials');
    const isPasswordValid = await this._hashService.compareHash(password, user.password);
    if (!isPasswordValid) throw new BadRequestException('Incorrect credentials');
    if(!user.is_verified) throw new BadRequestException("Incorrect credentials Password")
    const refreshToken = await this._userRefreshTokensService.generateAndCreateOne(user.id);
    return this._generateTokens(user, refreshToken);
  };
  public singInGoogle = async ( email:string ) => {
    const user = await this._usersService.getByEmail(email);
    if (!user) throw new BadRequestException('Incorrect credentials');
   
    const refreshToken = await this._userRefreshTokensService.generateAndCreateOne(user.id);
    return this._generateTokens(user, refreshToken);
  };

  public emailVerify= async (code:any) => {
    const user = await this._usersService.getByVerificationCode(code);
    if(user){
      const res = await this._usersService.setVerifiedEmailForUser(user.id)

    }
    return user;
  }


  public refreshTokens = async (userDto: Omit<IJwtRefreshTokenPayloadDto, 'ppid'>): Promise<{ token: string }> => {
    const refreshToken = await this._userRefreshTokensService.getById(userDto.refreshTokenId);
    if (!refreshToken) throw new ForbiddenException('Unauthorized');
    const token = this._generateAccessToken(userDto.id, userDto.refreshTokenId);
    return { token };
  };

  private _generateTokens(user: IUsersDto, { id, ppid }: IUserRefreshTokensDto): IJwtTokensDto {
    const token = this._generateAccessToken(user.id, id);
    const refreshToken = this._generateRefreshToken(user.id, {
      refreshTokenId: id,
      ppid,
    });
    return { token, refreshToken };
  }

  private _generateAccessToken(id: string, refreshTokenId: string): string {
    const payload: IJwtAccessTokenPayloadDto = { id, refreshTokenId };
    return jwt.sign(payload, jwtConfig.accessTokenSecret, {
      expiresIn: 60 * 60,
    });
  }

  private _generateRefreshToken(id: string, { refreshTokenId, ppid }: { refreshTokenId: string; ppid: string }): string {
    const payload: IJwtRefreshTokenPayloadDto = {
      id,
      refreshTokenId,
      ppid,
    };
    return jwt.sign(payload, jwtConfig.refreshTokenSecret, {
      expiresIn: 60 * 600,
    });
  }
}
