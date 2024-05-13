import { AutoMap } from '@automapper/classes';

export class UpdateFloorRequestDto {
  @AutoMap()
  id: string;

  @AutoMap()
  key: string;

  @AutoMap()
  name: string;

  @AutoMap()
  description: string;

  @AutoMap()
  motelRoomId: string;
}
