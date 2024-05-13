import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import {
  createMap,
  extend,
  forMember,
  forSelf,
  Mapper,
  mapWith,
  typeConverter,
} from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { Base, Device, Room } from '@/entities';
import { BaseResponseDto, DeviceDto, RoomResponseDto } from '@/dto/response';
import { CreateDeviceDto } from '@/dto/request';
const moment = require('moment');

@Injectable()
export class DeviceProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      const baseMapping = createMap(
        mapper,
        Base,
        BaseResponseDto,
        typeConverter(Date, String, (date) => {
          return moment(date).format('DD/MM/YYYY HH:mm:ss');
        }),
      );
      createMap(
        mapper,
        Device,
        DeviceDto,
        extend(baseMapping),
        // forMember(
        //   (dest) => dest.room,
        //   mapWith(Room, RoomResponseDto, (s) => s.room),
        // ),
      );
      createMap(mapper, CreateDeviceDto, Device);
    };
  }
}
