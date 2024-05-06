import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper, typeConverter } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { MotelRoom } from '@/entities';
import { MotelRoomDto } from '@/dto/response';
import { CreateMotelRoomRequestDto } from '@/dto/request';
const moment = require('moment');

@Injectable()
export class RoomProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      // Request to entity
      // createMap(mapper, , MotelRoom);
      // Entity to response
    };
  }
}
