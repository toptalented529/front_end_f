import { queryRunner } from '../../common/infra/db';
import { lookup } from '../../common/utils/common';
import { tables } from '../../configs';
import { mapDbError, UniqueViolationException } from '../../common/errors/db';
import { ResourceAlreadyExistException } from '../../common/errors/common';

import { IProjectsDto, IProjectPersistence } from './projectInterface';
import { ProjectMapper } from './projectMapper';

export class ProjectRepository {
  public getAll = (): Promise<IProjectsDto | IProjectsDto[] | null> => {
    return queryRunner({
      query: `
                    SELECT *
                    FROM "${tables.project}"
                    `,
      bindings: [],
      resultMapper: ProjectMapper.toDto,
      enableLog: true,
    })
  };

  public getById = (id: string): Promise<IProjectsDto> => {
    return queryRunner({
      query: `
                    SELECT id
                    FROM "${tables.project}"
                    WHERE id = $1
                    `,
      bindings: [id],
      resultMapper: ProjectMapper.toDto,
      enableLog: true,
    }).then(lookup);
  };

  public createOne = ({ id, imageId,urls,uuid }: IProjectsDto): Promise<IProjectsDto> => {
    return queryRunner({
      query: `
                    INSERT INTO "${tables.project}" (id, image_id, urls,uuid)
                    VALUES ($1, ARRAY[$2], $3, $4)
                    RETURNING id, image_id, urls, uuid;
                    `,
      bindings: [id, imageId, urls, uuid ],
      resultMapper:ProjectMapper.toDto,
      errorMapper: ProjectRepository.mapSaveDbError,
      enableLog: true,
    }).then(lookup);
  };

  ///////////////////////////////////publish part////////////////////////////////////////
  public setPublishURL = (id:any,projectName:any,url:string): Promise<string> => {
    return queryRunner({
      query: `
                    INSERT INTO "${tables.publishProject}" (id,project_name, project_url)
                    VALUES ($1, $2 , $3)
                    RETURNING project_url;
                    `,
      bindings: [id,projectName,url],
      resultMapper:ProjectMapper.publishURL,
      errorMapper: ProjectRepository.mapSaveDbError,
      enableLog: true,
    }).then(lookup);
  }


  public getByURL = (project_name: string): Promise<string> => {
    return queryRunner({
      query: `
                    SELECT project_url
                    FROM "${tables.publishProject}"
                    WHERE project_name = $1
                    `,
      bindings: [project_name],
      resultMapper: ProjectMapper.publishURL,
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
