import { AutoMap } from '@automapper/classes';

export class UpdateRoomRequestDto {
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
}
