import { IProjectsDto, IProjectPersistence } from './projectInterface';

export class ProjectMapper {
  public static toDto(db: IProjectPersistence): IProjectsDto {
    return { 
      id: db.id,
      imageId: db.image_id,
      urls: db.urls,
      uuid:db.uuid
    };
  }
  public static publishURL(db: any): string {
    return  db.project_url

  }

  

  public static toPersistence(dto: IProjectsDto): IProjectPersistence {
    return {
      id: dto.id,
      image_id: dto.imageId,
      urls: dto.urls,
      uuid:dto.uuid
    };
  }
}
