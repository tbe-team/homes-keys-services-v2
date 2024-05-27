import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class LoginRequestDto {
  @AutoMap()
  @ApiProperty()
  username: string;

  @AutoMap()
  @ApiProperty()
  password: string;
}
