import { AutoMap } from '@automapper/classes';

export class CreateRoomRequestDto {
  @AutoMap()
  acreage: number;

  @AutoMap()
  status: string;

  @AutoMap()
  price: number;

  @AutoMap()
  name: string;

  @AutoMap()
  description: string;

  @AutoMap()
  floorId: string;
}
