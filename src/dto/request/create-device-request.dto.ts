import { AutoMap } from '@automapper/classes';

export class CreateDeviceDto {
  @AutoMap()
  name: string;

  @AutoMap()
  type: string;

  @AutoMap()
  description: string;

  @AutoMap()
  status: string;

  roomId: string;

  @AutoMap()
  isGateway: boolean;

  @AutoMap()
  location: string;
}
