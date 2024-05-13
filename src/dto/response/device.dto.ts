import { AutoMap } from '@automapper/classes';
import { RoomResponseDto } from './room-response.dto';
export class DeviceDto {
  @AutoMap()
  id: string;

  @AutoMap()
  name: string;

  @AutoMap()
  type: number;

  @AutoMap()
  description: string;

  @AutoMap()
  status: string;

  @AutoMap()
  isGateway: boolean;

  @AutoMap()
  room: RoomResponseDto;
}
