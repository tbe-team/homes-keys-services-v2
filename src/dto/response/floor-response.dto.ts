import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseDto } from './base-response.dto';
import { RoomResponseDto } from './room-response.dto';

export class FloorReponseDto extends BaseResponseDto {
  @AutoMap()
  @ApiProperty()
  id: string;

  @AutoMap()
  @ApiProperty()
  key: string;

  @AutoMap()
  @ApiProperty()
  name: string;

  @AutoMap()
  @ApiProperty()
  description: string;

  @AutoMap()
  @ApiProperty()
  rooms: RoomResponseDto[];

  // @AutoMap()
  // motelRoom: MotelRoomDto;
}
