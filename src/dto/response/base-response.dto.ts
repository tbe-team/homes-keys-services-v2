import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class BaseResponseDto {
  @AutoMap()
  @ApiProperty()
  createdAt: string; // Creation date

  @AutoMap()
  @ApiProperty()
  updatedAt: string; // Last updated date
}
