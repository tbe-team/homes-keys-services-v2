import { Module } from '@nestjs/common';
import { RoomModule } from '@/modules/room.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { envConfiguration } from './configurations';
import { DatabaseModule, DeviceModule } from './modules';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envConfiguration],
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    DatabaseModule,
    RoomModule,
    DeviceModule,
  ],
})
export class AppModule {}
