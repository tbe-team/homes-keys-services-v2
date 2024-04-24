import { AutoMap } from '@automapper/classes';
export class DeviceDto {
  @AutoMap()
  id: string;

  @AutoMap()
  name: string;

  @AutoMap()
  type: number;

  @AutoMap()
  description: string;

  @AutoMap()
  status: string;
}
