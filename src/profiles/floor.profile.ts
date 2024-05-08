import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper, typeConverter } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { Floor, MotelRoom, Room } from '@/entities';
import { FloorReponseDto, MotelRoomDto, RoomResponseDto } from '@/dto/response';
import { CreateMotelRoomRequestDto } from '@/dto/request';
const moment = require('moment');

@Injectable()
export class FloorProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      // Request to entity
      createMap(
        mapper,
        Floor,
        FloorReponseDto,
        typeConverter(Room, RoomResponseDto, async (room: Room) => {
          return await mapper.mapAsync(room, Room, RoomResponseDto);
        }),
        // typeConverter(MotelRoom, MotelRoomDto, async (motelRoom) => {
        //   return await mapper.mapAsync(motelRoom, MotelRoom, MotelRoomDto);
        // }),
      );
      // Entity to response
    };
  }
}
