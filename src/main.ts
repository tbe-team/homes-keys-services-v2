import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { HttpExceptionFilter } from './filters';
import { ValidationPipe } from '@nestjs/common/pipes';
import { IValidationPipeOptions } from './interfaces';
import * as cookieParser from 'cookie-parser';
import * as csurf from 'csurf';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');
  const version = configService.get<string>('version');
  const validationPipeOptions: IValidationPipeOptions = {
    transform: true,
  };

  // Config
  // app.enableCors({ origin: '*' });
  app.setGlobalPrefix(`/api/${version}`);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe(validationPipeOptions));
  app.use(cookieParser());
  // app.use(csurf());

  await app.listen(port);
  Logger.log(`[Application] is running on port = ${port}`);
}
bootstrap();
