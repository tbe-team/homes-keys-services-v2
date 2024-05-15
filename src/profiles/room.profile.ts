import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, Mapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { Room } from '@/entities';
import { RoomResponseDto } from '@/dto/response';
import { CreateRoomRequestDto } from '@/dto/request';

@Injectable()
export class RoomProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper: Mapper) => {
      // Request to entity
      createMap(mapper, Room, RoomResponseDto);
      createMap(mapper, CreateRoomRequestDto, Room);
      // Entity to response
    };
  }
}
