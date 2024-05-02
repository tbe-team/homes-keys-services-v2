import { IsNumber, IsNotEmpty } from 'class-validator';
import { AutoMap } from '@automapper/classes';

export class CreateMotelRoomRequestDto {
  @IsNumber()
  @AutoMap()
  minPrice: number;

  @IsNumber()
  @AutoMap()
  maxPrice: number;

  @IsNotEmpty()
  @AutoMap()
  contactPhone: string;

  @IsNumber()
  @AutoMap()
  price: number;

  @IsNotEmpty()
  @AutoMap()
  name: string;

  @AutoMap()
  description: string;
}
