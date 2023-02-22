import { randomUUID } from 'crypto';
import { request } from 'undici';

import { ProjectRepository } from './projectRepository';
import { IProjectsDto } from './projectInterface';

export class ProjectService {
  public constructor(private readonly _projectRepository: ProjectRepository) {}

  public createOne = ({ id,imageId,urls,uuid }: IProjectsDto): Promise<IProjectsDto> => {
    return this._projectRepository.createOne({
      id: randomUUID(),
      imageId,
      urls,
      uuid
    });
  };

  public setPublishURL  = (project_name:string,url: string):Promise<string | null> => {
    return this._projectRepository.setPublishURL(randomUUID(),project_name,url)

  }

  public getAll = (): Promise<IProjectsDto | IProjectsDto[] | null> => {
    return this._projectRepository.getAll();
  };

  public getById = (id: string): Promise<IProjectsDto> => {
    return this._projectRepository.getById(id);
  };
  public getByURL = (url: string): Promise<string> => {
    return this._projectRepository.getByURL(url);
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
