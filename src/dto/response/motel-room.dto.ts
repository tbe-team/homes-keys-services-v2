import { AutoMap } from '@automapper/classes';
import { FloorReponseDto } from './floor-response.dto';

export class MotelRoomDto {
  @AutoMap()
  id: string;
  @AutoMap()
  minPrice: number;
  @AutoMap()
  maxPrice: number;
  @AutoMap()
  contactPhone: string;
  @AutoMap()
  price: number;
  @AutoMap()
  name: string;
  @AutoMap()
  description: string;
  @AutoMap()
  floor: FloorReponseDto[];
  // @AutoMap()
  // owner: User;
}
