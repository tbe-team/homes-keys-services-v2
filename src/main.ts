import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');
  const version = configService.get<string>('version');
  app.setGlobalPrefix(`/api/${version}`);
  await app.listen(port);
  Logger.log(`Application is running on port = ${port}`);
}
bootstrap();
