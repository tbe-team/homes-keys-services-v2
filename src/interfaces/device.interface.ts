import { DeviceDto } from '@/dto/response';
import { IBaseResponse } from './base.interface';

export interface IDeviceService {
  findAll(): Promise<DeviceDto[]>;

  syncDevicesByLocation(
    location: string,
    pageSize: string,
    page: string,
  ): Promise<IBaseResponse<void>>;
}
