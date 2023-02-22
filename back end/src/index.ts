import 'dotenv/config';
import fastifyRef from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyJwt, { FastifyJWTOptions } from '@fastify/jwt';
import { fastifyRequestContextPlugin } from '@fastify/request-context';
import pino from 'pino';

import { corsConfig, jwtConfig, loggerConfig, fastifyConfig } from './configs';
import { AuthenticatorService } from './common/infra/auth/authenticator-service';
import { app as appV1Plugin } from './common/api/rest-api/v1/app';
import { container } from './common/infra/container';
import { TOKENS } from './types';
import { APP_TOKENS } from './configs/constants';
import fastifyMultipart from "@fastify/multipart"
import fileUpload from 'fastify-file-upload'
import fastifyFormbody from '@fastify/formbody';

class RestServer {
  private readonly _fastify = fastifyRef({
    ...fastifyConfig,
    logger: pino(loggerConfig),
  });

  /**
   * @private
   */
  #plugins(): void {
    const jwtRefreshSetting = {
      secret: jwtConfig.refreshTokenSecret,
      namespace: 'refresh',
      verify: { extractToken: AuthenticatorService.getInstance.extractRefreshToken },
    } as FastifyJWTOptions;
    void this._fastify.register(fastifyMultipart, {});
    void this._fastify.register(fastifyFormbody);
    void this._fastify.register(fileUpload);
    void this._fastify.register(fastifyCors, corsConfig);
    void this._fastify.register(fastifyJwt, {
      secret: jwtConfig.accessTokenSecret,
      namespace: 'access',
    });
    void this._fastify.register(fastifyJwt, jwtRefreshSetting);
    void this._fastify.decorate('verifyJwtAccessToken', AuthenticatorService.getInstance.verifyJwtAccessToken);
    void this._fastify.decorate('verifyJwtRefreshToken', AuthenticatorService.getInstance.verifyJwtRefreshToken);
    void this._fastify.register(fastifyRequestContextPlugin);
    void this._fastify.register(appV1Plugin, { prefix: 'v1/' });
    void this._fastify.get("/",(req:any,res:any) => { 
      console.log("777777777777777777777",req.headers)

      const host = req.headers.host
      const shub = host.split(".")[0]

      if(shub === 'sub') {

      }
      res.send({ress:shub})
      
    })
  }
  /**
   * @private
   */
  #runAls(): void {
    const als = container.get(TOKENS.asyncLocalStorage);
    const store = new Map();
    store?.set(APP_TOKENS.logger, this._fastify.log);
    als.enterWith(store);
  }

  async start(): Promise<void> {
    try {
      this.#runAls();
      this.#plugins();
      void this._fastify.listen({ port: 8000, host: 'localhost' }, (err, address) => {
        if (err) {
          this._fastify.log.error(err);
          process.exit(1);
        }
      });
    } catch (err) {
      this._fastify.log.error(err);
      process.exit(1);
    }
  }
}

const app = new RestServer();
void app.start();
