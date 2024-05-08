import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper, typeConverter } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { Floor, Room } from '@/entities';
import { FloorReponseDto, RoomResponseDto } from '@/dto/response';
import { CreateFloorRequestDto } from '@/dto/request';
const moment = require('moment');

@Injectable()
export class FloorProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      // const mapping = createMap(mapper, MotelRoom, MotelRoomDto);
      // Request to entity
      createMap(
        mapper,
        Floor,
        FloorReponseDto,
        typeConverter(Date, String, (date) => {
          return moment(date).format('DD/MM/YYYY HH:mm:ss');
        }),
      );
      createMap(mapper, CreateFloorRequestDto, Floor);
      createMap(mapper, Room, RoomResponseDto);
    };
  }
}
