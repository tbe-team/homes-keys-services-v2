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
  createdAt: string; // Creation date

  @AutoMap()
  updatedAt: string; // Last updated date

  @AutoMap()
  isGateway: boolean;

  @AutoMap()
  room: RoomResponseDto;
}
