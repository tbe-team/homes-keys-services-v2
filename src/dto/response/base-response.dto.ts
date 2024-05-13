import { AutoMap } from '@automapper/classes';

export class BaseResponseDto {
  @AutoMap()
  createdAt: string; // Creation date

  @AutoMap()
  updatedAt: string; // Last updated date
}
