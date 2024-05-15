import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseDto } from './base-response.dto';

export class RoomResponseDto extends BaseResponseDto {
  @ApiProperty()
  @AutoMap()
  id: string;

  @AutoMap()
  @ApiProperty()
  acreage: number;

  @AutoMap()
  @ApiProperty()
  status: string;

  @AutoMap()
  @ApiProperty()
  price: number;

  @AutoMap()
  @ApiProperty()
  name: string;

  @AutoMap()
  @ApiProperty()
  description: string;
}
