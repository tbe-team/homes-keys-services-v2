import { AutoMap } from '@automapper/classes';

export class UpdateDeviceDto {
  id: string;

  name: string;

  type: string;

  description: string;

  status: string;

  isGateway: boolean;

  location: string;
}
