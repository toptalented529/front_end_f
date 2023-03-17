import { queryRunner } from '../../common/infra/db';
import { lookup } from '../../common/utils/common';
import { tables } from '../../configs';
import { mapDbError, UniqueViolationException } from '../../common/errors/db';
import { ResourceAlreadyExistException } from '../../common/errors/common';

import { UsersMapper } from './users-mapper';
import { IUsersDto } from './users-interfaces';

export class UsersRepository {
  public getByIdType = (idType: string): Promise<IUsersDto | null> => {
    return queryRunner({
      query: `
                    SELECT id, id_type, password
                    FROM "${tables.user}"
                    WHERE id_type = $1
                    `,
      bindings: [idType],
      resultMapper: UsersMapper.toDto,
      enableLog: true,
    }).then(lookup);
  };

  public getById = (id: string): Promise<IUsersDto> => {
    return queryRunner({
      query: `
                    SELECT id, id_type
                    FROM "${tables.user}"
                    WHERE id = $1
                    `,
      bindings: [id],
      resultMapper: UsersMapper.toDto,
      enableLog: true,
    }).then(lookup);
  };

  public createOne = ({ id, username,email, password,verificationCode }: IUsersDto): Promise<IUsersDto> => {
    return queryRunner({
      query: `
                    INSERT INTO "${tables.user}" (id, username,email, password, verificationcode)
                    VALUES ($1, $2, $3, $4, $5)
                    RETURNING id,email,username;
                    `,
      bindings: [id, username,email, password,verificationCode],
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
