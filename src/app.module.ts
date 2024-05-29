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
  RoleModule,
} from '@/modules';
import { DevtoolsModule } from '@nestjs/devtools-integration';

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
    DevtoolsModule.register({
      http: process.env.NODE_ENV !== 'production',
    }),
    RoleModule,
  ],
})
export class AppModule {}
