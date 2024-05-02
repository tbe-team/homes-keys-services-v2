import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MotelRoomController } from '@/controllers';
import { MotelRoom } from '@/entities';
import { MotelProfile } from '@/profiles';
import { HttpModule } from '@nestjs/axios';
import { MotelRoomService } from '@/services';

@Module({
  imports: [TypeOrmModule.forFeature([MotelRoom]), HttpModule],
  providers: [MotelRoomService, MotelProfile],
  controllers: [MotelRoomController],
  exports: [MotelRoomService],
})
export class MotelRoomModule {}
