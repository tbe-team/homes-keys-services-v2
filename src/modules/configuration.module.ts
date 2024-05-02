import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envConfiguration } from '@/configurations';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envConfiguration],
      isGlobal: true,
    }),
  ],
})
export class ConfigruationModule {}
