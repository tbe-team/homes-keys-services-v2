import { IsNumber, IsNotEmpty } from 'class-validator';
import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class CreateMotelRoomRequestDto {
  @IsNumber()
  @AutoMap()
  @ApiProperty()
  minPrice: number;

  @IsNumber()
  @AutoMap()
  @ApiProperty()
  maxPrice: number;

  @IsNotEmpty()
  @AutoMap()
  @ApiProperty()
  contactPhone: string;

  @IsNumber()
  @AutoMap()
  @ApiProperty()
  price: number;

  @IsNotEmpty()
  @AutoMap()
  @ApiProperty()
  name: string;

  @AutoMap()
  @ApiProperty()
  description: string;
}
