import { AutoMap } from '@automapper/classes';

export class CreateUserRequestDto {
  @AutoMap()
  dob: string;

  @AutoMap()
  phonenumber: string;

  @AutoMap()
  firstName: string;

  @AutoMap()
  lastName: string;

  @AutoMap()
  email: string;

  @AutoMap()
  password: string;
}
