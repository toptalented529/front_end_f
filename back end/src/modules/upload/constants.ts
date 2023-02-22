import { token } from 'brandi';
import { ProjectRepository } from './projectRepository';
import { ProjectService } from './projectService';
import { UploadController } from './upload-controller';

export const UPLOAD_TOKENS = {
    uploadController: token<UploadController>('uploadController'),
    projectService: token<ProjectService>('projectService'),
    projectRepository: token<ProjectRepository>('projectRepository'),
};




