import { DeviceDto } from '@/dto/response';
import { IBaseResponse } from './base.interface';

export interface IDeviceService {
  findAll(): Promise<DeviceDto[]>;

  syncDevicesByLocation(
    location: string,
    pageSize: string,
    page: string,
  ): Promise<IBaseResponse<void>>;

  getDataFromStartDateToEndDate(
    id: string,
    startDate: string,
    endDate: string,
    intervalType: string,
  ): Promise<IBaseResponse<IDataResponse[]>>;
}

export interface IDataResponse {
  ts: string;
  value: number | null;
}
