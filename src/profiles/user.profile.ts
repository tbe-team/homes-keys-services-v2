import { CreateUserRequestDto } from '@/dto/request';
import {
  BaseResponseDto,
  MotelResponseDto,
  RoleResponseDto,
  UserResponseDto,
} from '@/dto/response';
import { Base, MotelRoom, Role, User } from '@/entities';
import {
  createMap,
  extend,
  forMember,
  mapFrom,
  Mapper,
  typeConverter,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
const moment = require('moment');

@Injectable()
export class UserProfile extends AutomapperProfile {
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
      createMap(mapper, CreateUserRequestDto, User);
      createMap(
        mapper,
        User,
        UserResponseDto,
        extend(baseMapping),
        forMember(
          (dest) => dest.motelRooms,
          mapFrom((src) =>
            mapper.mapArray(src.motelRooms, MotelRoom, MotelResponseDto),
          ),
        ),
        forMember(
          (dest) => dest.role,
          mapFrom((src) => mapper.map(src.role, Role, RoleResponseDto)),
        ),
      );
    };
  }
}
