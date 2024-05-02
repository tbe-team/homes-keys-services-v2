import { Module } from '@nestjs/common';
import { RoomModule } from '@/modules/room.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { envConfiguration } from './configurations';
import { DatabaseModule, DeviceModule, MotelRoomModule } from './modules';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [envConfiguration],
      isGlobal: true,
    }),
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    DatabaseModule,
    RoomModule,
    DeviceModule,
    MotelRoomModule,
  ],
})
export class AppModule {}
