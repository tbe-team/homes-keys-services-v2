import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { BaseResponseDto } from './base-response.dto';

export class RoleResponseDto extends BaseResponseDto {
  @ApiProperty()
  @AutoMap()
  id: string;

  @AutoMap()
  @ApiProperty()
  roleName: number;

  @AutoMap()
  @ApiProperty()
  description: string;
}
