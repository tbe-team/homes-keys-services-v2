import { AutoMap } from '@automapper/classes';
import { MotelRoomDto } from './motel-room.dto';
import { RoomResponseDto } from './room-response.dto';

export class FloorReponseDto {
  @AutoMap()
  id: string;

  @AutoMap()
  key: string;

  @AutoMap()
  name: string;

  @AutoMap()
  description: string;

  @AutoMap()
  rooms: RoomResponseDto[];

  @AutoMap()
  motelRoom: MotelRoomDto;
}
