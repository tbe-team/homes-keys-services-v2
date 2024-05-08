import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper, typeConverter } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { Device, Room } from '@/entities';
import { DeviceDto, RoomResponseDto } from '@/dto/response';
import { CreateDeviceDto } from '@/dto/request';
const moment = require('moment');

@Injectable()
export class DeviceProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(
        mapper,
        Device,
        DeviceDto,
        typeConverter(Date, String, (date) => {
          return moment(date).format('DD/MM/YYYY HH:mm:ss');
        }),
        typeConverter(Room, RoomResponseDto, async (room) => {
          return await mapper.mapAsync(room, Room, RoomResponseDto);
        }),
      );
      createMap(mapper, CreateDeviceDto, Device);
    };
  }
}
