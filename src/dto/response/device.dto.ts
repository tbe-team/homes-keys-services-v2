import { AutoMap } from '@automapper/classes';
import { RoomResponseDto } from './room-response.dto';
import { ApiProperty, ApiExtraModels } from '@nestjs/swagger';

// @ApiExtraModels(DeviceDto)
export class DeviceDto {
  @ApiProperty()
  @AutoMap()
  id: string;

  @ApiProperty()
  @AutoMap()
  name: string;

  @ApiProperty()
  @AutoMap()
  type: number;

  @ApiProperty()
  @AutoMap()
  description: string;

  @ApiProperty()
  @AutoMap()
  status: string;

  @ApiProperty()
  @AutoMap()
  isGateway: boolean;

  @ApiProperty()
  @AutoMap()
  room: RoomResponseDto;
}
