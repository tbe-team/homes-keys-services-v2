import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class CreateFloorRequestDto {
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
  motelRoomId: string;
}
