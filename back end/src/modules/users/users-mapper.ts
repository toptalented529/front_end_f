import { IUsersDto, IUsersPersistence } from './users-interfaces';

export class UsersMapper {
  public static toDto(db: IUsersPersistence): IUsersDto {
    return {
      id: db.id,
      username: db.username,
      email: db.email,
      password: db.password,
      verificationCode:db.verificationCode,
    };
  }

  public static toPersistence(dto: IUsersDto): IUsersPersistence {
    return {
      id: dto.id,
      username: dto.username,
      email: dto.username,
      password: dto.password,
      verificationCode:dto.verificationCode,
    };
  }
}
