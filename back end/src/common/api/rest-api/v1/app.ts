import { FastifyInstance } from 'fastify';

import { authModule } from '../../../../modules/auth';
import { userModule } from '../../../../modules/users';
import { uploadModule } from '../../../../modules/upload';

export const app = (fastify: FastifyInstance): PromiseLike<void> => {
  return fastify.after().then(() => {
    void fastify.register(async (inst, opts) => authModule.initRouter(inst, opts), {
      prefix: authModule.routerPrefix,
    });

    void fastify.register(async (inst, opts) => userModule.initRouter(inst, opts), {
      prefix: userModule.routerPrefix,
    });
    void fastify.register(async (inst, opts) => uploadModule.initRouter(inst, opts), {
      prefix: uploadModule.routerPrefix,
    });
  });
};
