export interface IUsersDto {
  id: string;
  username: string;
  email: string;
  password: string;
  isVerified?:boolean;
  verificationCode?:string;
}

export interface IUsersPersistence {
  id: string;
  username: string;
  email: string;
  password: string;
  isVerified?:boolean;
  verificationCode?:string;
}
