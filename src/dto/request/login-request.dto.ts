import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class LoginRequestDto {
  @AutoMap()
  @ApiProperty()
  phonumber: string;

  @AutoMap()
  @ApiProperty()
  password: string;
}
