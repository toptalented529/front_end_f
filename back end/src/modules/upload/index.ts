import { injected } from 'brandi';

import { container } from '../../common/infra/container';
import { TOKENS } from '../../types';

import { UploadController } from './upload-controller';
import { ProjectService } from './projectService';

injected(ProjectService,TOKENS.projectRepository);

injected(UploadController,TOKENS.projectService);

export const uploadModule = container.get(TOKENS.uploadController);
