import { AutoMap } from '@automapper/classes';

export class RoomResponseDto {
  @AutoMap()
  id: string;

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
