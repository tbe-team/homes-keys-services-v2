import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { FloorReponseDto } from './floor-response.dto';

export class MotelResponseDto {
  @AutoMap()
  @ApiProperty()
  id: string;

  @AutoMap()
  @ApiProperty()
  minPrice: number;

  @AutoMap()
  @ApiProperty()
  maxPrice: number;

  @AutoMap()
  @ApiProperty()
  contactPhone: string;

  @AutoMap()
  @ApiProperty()
  price: number;

  @AutoMap()
  @ApiProperty()
  name: string;

  @AutoMap()
  description: string;

  @ApiProperty()
  @AutoMap()
  floor: FloorReponseDto[];
}
