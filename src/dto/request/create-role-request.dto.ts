import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from 'class-validator';

export class CreateRoleRequestDto {
  @IsNotEmpty()
  @AutoMap()
  @ApiProperty()
  roleName: string;

  @IsOptional()
  @AutoMap()
  @ApiProperty()
  description: string;
}
