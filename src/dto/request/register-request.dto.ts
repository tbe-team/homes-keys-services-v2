import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterRequestDto {
  @AutoMap()
  @ApiProperty()
  phonenumber: string;

  @AutoMap()
  @ApiProperty()
  firstName: string;

  @ApiProperty()
  @AutoMap()
  lastName: string;

  @AutoMap()
  @ApiProperty()
  email: string;

  @AutoMap()
  @ApiProperty()
  password: string;
}
