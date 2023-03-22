export interface IUsersDto {
  id: string;
  username: string;
  email: string;
  password: string;
  verificationcode?:string;
  is_verified?:boolean;
  space?:string;
  business?:string;
  email_bus?:string;
  phone?:string;
  address?:string;
  language?:string;
  timezone?:string;
  payment?:string;
}

export interface IUsersPersistence {
  id: string;
  username: string;
  email: string;
  password: string;
  is_verified?:boolean;
  verificationcode?:string;
  space?:string;
  business?:string;
  email_bus?:string;
  phone?:string;
  address?:string;
  language?:string;
  timezone?:string;
  payment?:string;
}
