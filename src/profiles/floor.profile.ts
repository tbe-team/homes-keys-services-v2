import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, extend, Mapper, typeConverter } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { Base, Floor, Room } from '@/entities';
import {
  BaseResponseDto,
  FloorReponseDto,
  RoomResponseDto,
} from '@/dto/response';
import { CreateFloorRequestDto } from '@/dto/request';
const moment = require('moment');

@Injectable()
export class FloorProfile extends AutomapperProfile {
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
      createMap(mapper, Floor, FloorReponseDto, extend(baseMapping));
      createMap(mapper, CreateFloorRequestDto, Floor);
      // createMap(mapper, Room, RoomResponseDto);
    };
  }
}
