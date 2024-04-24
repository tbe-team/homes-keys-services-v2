import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper, typeConverter } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { Device } from '@/entities';
import { DeviceDto } from '@/dto';
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
      );
      // createMap(
      //   mapper,
      //   DeviceDto,
      //   Device,
      //   // forMember((dest) => dest.id, ignore()),
      // );
    };
  }
}
