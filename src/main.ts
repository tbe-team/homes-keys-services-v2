import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api/v1.0.0');
  const configService = app.get(ConfigService);

  const port = configService.get<number>('port');
  Logger.log(`Application is running on port = ${port}`);
  await app.listen(port);
}
bootstrap();
