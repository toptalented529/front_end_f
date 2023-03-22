export interface ISignUpDto {
  readonly email: string;
  readonly username:string;
  readonly password: string;
  readonly verificationcode: string;
  readonly is_verified?: boolean;
}

export interface ISignUpBodyDto {

  readonly id: string;
  readonly email: string;
  readonly username:string;
  readonly password: string;
  readonly verificationcode: string;

}

export interface ISignInDto {
  readonly email: string;
  readonly password: string;
}

export interface IJwtAccessTokenPayloadDto {
  readonly id: string;
  readonly refreshTokenId: string;
}

export interface IJwtRefreshTokenPayloadDto extends IJwtAccessTokenPayloadDto {
  readonly ppid: string;
}

export interface IJwtTokensDto {
  readonly token: string;
  readonly refreshToken: string;
}

export interface IQueryParamsLogout {
  all?: boolean;
}
