import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseDto } from './base-response.dto';
import { MotelResponseDto } from './motel-response.dto';
import { RoleResponseDto } from './role-response.dto';

export class UserResponseDto extends BaseResponseDto {
  @ApiProperty()
  @AutoMap()
  id: string;

  @ApiProperty()
  @AutoMap()
  dob: string;

  @ApiProperty()
  @AutoMap()
  phonenumber: string;

  @ApiProperty()
  @AutoMap()
  firstName: string;

  @ApiProperty()
  @AutoMap()
  lastName: string;

  @AutoMap()
  @ApiProperty()
  email: string;

  @AutoMap()
  @ApiProperty()
  isVerified?: boolean = false;

  @AutoMap()
  @ApiProperty()
  isActived?: boolean = false;

  @AutoMap()
  motelRooms: MotelResponseDto[];

  @AutoMap()
  role: RoleResponseDto;
}
