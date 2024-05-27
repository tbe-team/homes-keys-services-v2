import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DeviceController } from '@/controllers';
import { Device, Room } from '@/entities';
import { DeviceService } from '@/services/device.service';
import { DeviceProfile } from '@/profiles';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [TypeOrmModule.forFeature([Device, Room]), HttpModule],
  providers: [DeviceService, DeviceProfile],
  controllers: [DeviceController],
  exports: [DeviceService],
})
export class DeviceModule {}
