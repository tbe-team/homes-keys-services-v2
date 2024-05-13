import { AutoMap } from '@automapper/classes';

export class CreateFloorRequestDto {
  @AutoMap()
  key: string;

  @AutoMap()
  name: string;

  @AutoMap()
  description: string;

  @AutoMap()
  motelRoomId: string;
}
