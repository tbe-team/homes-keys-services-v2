import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { createMap, extend, Mapper, typeConverter } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { Base, Role, User } from '@/entities';
import { BaseResponseDto, RoleResponseDto } from '@/dto/response';
import { CreateRoleRequestDto, CreateUserRequestDto } from '@/dto/request';
const moment = require('moment');

@Injectable()
export class RoleProfile extends AutomapperProfile {
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
      createMap(mapper, Role, RoleResponseDto, extend(baseMapping));
      createMap(mapper, CreateRoleRequestDto, Role);
    };
  }
}
