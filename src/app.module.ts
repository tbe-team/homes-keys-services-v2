import { Module } from '@nestjs/common';
import { RoomModule } from '@/modules/room.module';
import {
  ConfigruationModule,
  CustomAutomapperModule,
  CustomEventEmitterModule,
  DatabaseModule,
  DeviceModule,
  FloorModule,
  MotelRoomModule,
  TaskModule,
  UserModule,
  AuthModule,
  CaslModule,
} from '@/modules';

@Module({
  imports: [
    ConfigruationModule,
    CustomAutomapperModule,
    CustomEventEmitterModule,
    TaskModule,
    DatabaseModule,
    RoomModule,
    DeviceModule,
    MotelRoomModule,
    FloorModule,
    UserModule,
    AuthModule,
    CaslModule,
  ],
})
export class AppModule {}
