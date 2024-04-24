import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, forMember, ignore, Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { Device } from '@/entities';
import { DeviceDto } from '@/dto';

@Injectable()
export class DeviceProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      createMap(mapper, Device, DeviceDto);
      // createMap(
      //   mapper,
      //   DeviceDto,
      //   Device,
      //   // forMember((dest) => dest.id, ignore()),
      // );
    };
  }
}
