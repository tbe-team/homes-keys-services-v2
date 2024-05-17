import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, extend, Mapper, typeConverter } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { Base, Device } from '@/entities';
import { BaseResponseDto, DeviceDto } from '@/dto/response';
import { CreateDeviceRequestDto } from '@/dto/request';
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
      createMap(mapper, CreateDeviceRequestDto, Device);
    };
  }
}
