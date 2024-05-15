import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper, typeConverter } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { MotelRoom } from '@/entities';
import { CreateMotelRoomRequestDto } from '@/dto/request';
import { MotelResponseDto } from '@/dto/response';
const moment = require('moment');

@Injectable()
export class MotelProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      // Request to entity
      createMap(mapper, CreateMotelRoomRequestDto, MotelRoom);

      // Entity to response
      createMap(
        mapper,
        MotelRoom,
        MotelResponseDto,
        // typeConverter(Date, String, (date) => {
        //   return moment(date).format('DD/MM/YYYY HH:mm:ss');
        // }),
      );
    };
  }
}
