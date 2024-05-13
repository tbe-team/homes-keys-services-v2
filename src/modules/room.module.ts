import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { RoomController } from '@/controllers';
import { Floor, Room } from '@/entities';
import { RoomService } from '@/services';
import { RoomProfile } from '@/profiles';

@Module({
  imports: [TypeOrmModule.forFeature([Room, Floor])],
  providers: [RoomService, RoomProfile],
  controllers: [RoomController],
  exports: [RoomService],
})
export class RoomModule {}
