import { randomUUID } from 'crypto';
import { request } from 'undici';

import { UsersRepository } from './users-repository';
import { IUsersDto } from './users-interfaces';
import { ISignUpDto } from '../auth/auth-interfaces';

export class UsersService {
  public constructor(private readonly _usersRepository: UsersRepository) {}

  public createOne = ({ username,email, password,verificationcode, is_verified }: ISignUpDto): Promise<IUsersDto> => {
    return this._usersRepository.createOne({
      id: randomUUID(),
      username,
      email,
      password,
      verificationcode,
      is_verified,
    });
  };

  public getByVerificationCode = (code: string): Promise<IUsersDto | null> => {
    return this._usersRepository.getByVerificationcode(code);
  };

  public setVerifiedEmailForUser = (id:string): Promise<IUsersDto | null> => {
    return this._usersRepository.setVerifiedEmailForUser(id);
  }
  public setSpaceForUser = (id:string,space:string): Promise<IUsersDto | null> => {
    return this._usersRepository.setSpaceForUser(id,space);
  }
  public setBusinessForUser = (id:string,space:string): Promise<IUsersDto | null> => {
    return this._usersRepository.setBusinessForUser(id,space);
  }
  public setAddress = (id:string,email:string,phone:string,address:string): Promise<IUsersDto | null> => {
    return this._usersRepository.setAddress(id,email,phone,address);
  }
  public setTimezone = (id:string,language:string,timezone:string): Promise<IUsersDto | null> => {
    return this._usersRepository.setTimezone(id,language,timezone);
  }
  public setPayment = (id:string,payment:string): Promise<IUsersDto | null> => {
    return this._usersRepository.setPayment(id,payment);
  }

  public getById = (id: string): Promise<IUsersDto | null> => {
    return this._usersRepository.getById(id);
  };
  public getByEmail = (email: string): Promise<IUsersDto | null> => {
    return this._usersRepository.getByEmail(email);
  };

  public latency = async (): Promise<string> => {
    let result: string = '';
    const start = new Date();
    await request('https://google.com').finally(() => {
      // @ts-ignore
      result = new Date() - start + 'ms';
    });
    return result;
  };
}
