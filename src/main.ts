import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { getConnection } from 'typeorm';
import * as helmet from 'helmet';

import { setupSwagger } from './swagger';
import { AppModule } from './modules/main/app.module';
import { loggerMiddleware } from './modules/common/middlewares/logger.middleware';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const logger = new Logger('Main', true);
  const globalPrefix = '/api';

  setupSwagger(app);

  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(globalPrefix);
  app.use(helmet());
  app.use(loggerMiddleware);

  await app.listen(AppModule.port);

  // for Hot Module Reload
  if (module.hot) {
    const connection = getConnection();
    if (connection.isConnected) {
      await connection.close();
    }
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  // Log current url of app and documentation
  let baseUrl = app.getHttpServer().address().address;
  if (baseUrl === '0.0.0.0' || baseUrl === '::') {
    baseUrl = 'localhost';
  }
  const url = `http://${baseUrl}:${AppModule.port}${globalPrefix}`;
  logger.log(`Listening to ${url}`);
  if (AppModule.isDev) {
    logger.log(`API Documentation available at ${url}/swagger`);
  }
}
bootstrap();
