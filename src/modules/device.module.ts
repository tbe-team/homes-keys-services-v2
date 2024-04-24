import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DeviceController, RoomController } from '@/controllers';
import { Device, Room } from '@/entities';
import { RoomService } from '@/services';
import { DeviceService } from '@/services/device.service';
import { DeviceProfile } from '@/profiles';

@Module({
  imports: [TypeOrmModule.forFeature([Device])],
  providers: [DeviceService, DeviceProfile],
  controllers: [DeviceController],
  exports: [DeviceService],
})
export class DeviceModule {}
