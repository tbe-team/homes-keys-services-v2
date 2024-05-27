import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, extend, Mapper, typeConverter } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { Base, MotelRoom } from '@/entities';
import { CreateMotelRoomRequestDto } from '@/dto/request';
import { BaseResponseDto, MotelResponseDto } from '@/dto/response';
const moment = require('moment');

@Injectable()
export class MotelProfile extends AutomapperProfile {
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
      // Request to entity
      createMap(mapper, CreateMotelRoomRequestDto, MotelRoom);

      // Entity to response
      createMap(
        mapper,
        MotelRoom,
        MotelResponseDto,
        extend(baseMapping),
        // typeConverter(Date, String, (date) => {
        //   return moment(date).format('DD/MM/YYYY HH:mm:ss');
        // }),
      );
    };
  }
}
