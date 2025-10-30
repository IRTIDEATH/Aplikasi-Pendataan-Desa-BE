import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AuthService } from '@thallesp/nestjs-better-auth';
import { toNodeHandler } from 'better-auth/node';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false, // Diperlukan untuk Better Auth
  });

  app.setGlobalPrefix('api');

  const expressApp = app.getHttpAdapter().getInstance();

  const authService = app.get<AuthService>(AuthService);

  expressApp.all(
    /^\/api\/auth\/.*/,
    toNodeHandler(authService.instance.handler),
  );

  expressApp.use(require('express').json());

  const logger = app.get(WINSTON_MODULE_NEST_PROVIDER);
  app.useLogger(logger);

  app.enableCors({
    credentials: true,
    origin: ['http://localhost:3001']
  });

  await app.listen(3000);
}
bootstrap();
