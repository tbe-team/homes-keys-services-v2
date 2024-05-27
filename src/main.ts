import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { HttpExceptionFilter } from './filters';
import { ValidationPipe } from '@nestjs/common/pipes';
import { IValidationPipeOptions } from './interfaces';
import * as cookieParser from 'cookie-parser';
import { SwaggerModule } from '@nestjs/swagger';
import { swaggerConfiguration } from '@/configurations';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    snapshot: true,
  });
  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');
  const version = configService.get<string>('version');
  const validationPipeOptions: IValidationPipeOptions = {
    transform: true,
  };
  const document = SwaggerModule.createDocument(app, swaggerConfiguration);

  // Config
  SwaggerModule.setup(`/api/${version}/docs`, app, document);
  app.setGlobalPrefix(`/api/${version}`);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe(validationPipeOptions));
  app.use(cookieParser());

  await app.listen(port);
  Logger.log(`[Application] is running on port = ${port}`);
}
bootstrap();
