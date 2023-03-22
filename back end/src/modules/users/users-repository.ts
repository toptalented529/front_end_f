import { queryRunner } from '../../common/infra/db';
import { lookup } from '../../common/utils/common';
import { tables } from '../../configs';
import { mapDbError, UniqueViolationException } from '../../common/errors/db';
import { ResourceAlreadyExistException } from '../../common/errors/common';

import { UsersMapper } from './users-mapper';
import { IUsersDto } from './users-interfaces';

export class UsersRepository {
  public getByVerificationcode = (verificationcode: string): Promise<IUsersDto | null> => {
    return queryRunner({
      query: `
                    SELECT id, verificationcode
                    FROM "${tables.user}"
                    WHERE verificationcode = $1
                    `,
      bindings: [verificationcode],
      resultMapper: UsersMapper.toDto,
      enableLog: true,
    }).then(lookup);
  };

  public getById = (id: string): Promise<IUsersDto | null> => {
    return queryRunner({
      query: `
                    SELECT id, email, password,username,is_verified,space,business,email_bus,phone,address,language,timezone,payment,onboarding_finished
                    FROM "${tables.user}"
                    WHERE id = $1
                    `,
      bindings: [id],
      resultMapper: UsersMapper.toDto,
      enableLog: true,
    }).then(lookup);
  };

  public getByEmail = (email: string): Promise<IUsersDto | null> => {
    return queryRunner({
      query: `
                    SELECT id, email, password,username,is_verified,verificationcode
                    FROM "${tables.user}"
                    WHERE email = $1
                    `,
      bindings: [email],
      resultMapper: UsersMapper.toDto,
      enableLog: true,
    }).then(lookup);
  };

  public setVerifiedEmailForUser = (id:string ): Promise<IUsersDto> => {
    return queryRunner({
      query: `
            UPDATE "${tables.user}"
            SET is_verified = true
            WHERE id = $1
            RETURNING id, is_verified
                    `,
      bindings: [id],
      resultMapper: UsersMapper.toDto,
      enableLog: true,
    }).then(lookup);
  };
  public setSpaceForUser = (id:string,space:string ): Promise<IUsersDto> => {
    return queryRunner({
      query: `
          UPDATE "${tables.user}"
          SET space = $1
          WHERE id = $2
          RETURNING id, space
                    `,
      bindings: [space,id],
      resultMapper: UsersMapper.toDto,
      enableLog: true,
    }).then(lookup);
  };
  public setBusinessForUser = (id:string,business:string ): Promise<IUsersDto> => {
    return queryRunner({
      query: `
          UPDATE "${tables.user}"
          SET business = $1
          WHERE id = $2
          RETURNING id, business
                    `,
      bindings: [business,id],
      resultMapper: UsersMapper.toDto,
      enableLog: true,
    }).then(lookup);
  };
  public setAddress = (id:string,email:string,phone:string,address:string ): Promise<IUsersDto> => {
    return queryRunner({
      query: `
          UPDATE "${tables.user}"
          SET address = $3, email_bus = $1, phone = $2
          WHERE id = $4
          RETURNING id, address,email_bus,phone
                    `,
      bindings: [email,phone,address,id],
      resultMapper: UsersMapper.toDto,
      enableLog: true,
    }).then(lookup);
  };
  public setTimezone = (id:string,language:string,timezone:string): Promise<IUsersDto> => {
    return queryRunner({
      query: `
          UPDATE "${tables.user}"
          SET language = $1, timezone = $2
          WHERE id = $3
          RETURNING id, language,timezone
                    `,
      bindings: [language,timezone,id],
      resultMapper: UsersMapper.toDto,
      enableLog: true,
    }).then(lookup);
  };
  public setPayment = (id:string,payment:string): Promise<IUsersDto> => {
    return queryRunner({
      query: `
          UPDATE "${tables.user}"
          SET payment = $1, onboarding_finished = true
          WHERE id = $2
          RETURNING id, payment
                    `,
      bindings: [payment,id],
      resultMapper: UsersMapper.toDto,
      enableLog: true,
    }).then(lookup);
  };

  public createOne = ({ id, username,email, password,verificationcode,is_verified }: IUsersDto): Promise<IUsersDto> => {
    return queryRunner({
      query: `
                    INSERT INTO "${tables.user}" (id, username,email, password, verificationcode, is_verified)
                    VALUES ($1, $2, $3, $4, $5,$6)
                    RETURNING id,email,username;
                    `,
      bindings: [id, username,email, password,verificationcode,is_verified],
      resultMapper: UsersMapper.toDto,
      errorMapper: UsersRepository.mapSaveDbError,
      enableLog: true,
    }).then(lookup);
  };

  static mapSaveDbError(error: any): any {
    try {
      console.debug(`Database error - ${error}`);
      mapDbError(error);
    } catch (dbError: any) {
      if (dbError.name === UniqueViolationException.name) {
        throw new ResourceAlreadyExistException(dbError.message);
      }
    }
  }
}
