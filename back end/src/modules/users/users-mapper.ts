import { IUsersDto, IUsersPersistence } from './users-interfaces';

export class UsersMapper {
  public static toDto(db: IUsersPersistence): IUsersDto {
    return {
      id: db.id,
      username: db.username,
      email: db.email,
      password: db.password,
      verificationcode:db.verificationcode,
      is_verified:db.is_verified,
      space:db.space,
      business:db.business,
      email_bus:db.email_bus,
      phone:db.phone,
      address:db.address,
      language:db.language,
      timezone:db.timezone,
      payment:db.payment
    };
  }

  public static toPersistence(dto: IUsersDto): IUsersPersistence {
    return {
      id: dto.id,
      username: dto.username,
      email: dto.username,
      password: dto.password,
      verificationcode:dto.verificationcode,
      is_verified:dto.is_verified,
      space:dto.space,
      business:dto.business,
      email_bus:dto.email_bus,
      phone:dto.phone,
      address:dto.address,
      language:dto.language,
      timezone:dto.timezone,
      payment:dto.payment,
    };
  }
}
