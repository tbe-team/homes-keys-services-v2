import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateMotelRequestDto {
  @ApiProperty()
  @AutoMap()
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
  @ApiProperty()
  description: string;
}
