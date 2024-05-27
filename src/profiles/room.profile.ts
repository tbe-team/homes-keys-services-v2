import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, extend, Mapper, typeConverter } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { Base, Room } from '@/entities';
import { BaseResponseDto, RoomResponseDto } from '@/dto/response';
import { CreateRoomRequestDto } from '@/dto/request';
const moment = require('moment');

@Injectable()
export class RoomProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      // Request to entity
      const baseMapping = createMap(
        mapper,
        Base,
        BaseResponseDto,
        typeConverter(Date, String, (date) => {
          return moment(date).format('DD/MM/YYYY HH:mm:ss');
        }),
      );
      createMap(mapper, Room, RoomResponseDto, extend(baseMapping));
      createMap(mapper, CreateRoomRequestDto, Room);
      // Entity to response
    };
  }
}
