import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRoomRequestDto {
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
