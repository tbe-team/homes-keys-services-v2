import {
  CreateDeviceDto,
  PageOptionsRequest,
  SyncDeviceOptionRequest,
  UpdateDeviceDto,
} from '@/dto/request';
import { DeviceDto, PageDto } from '@/dto/response';
import { IBaseResponse } from './base.interface';

export interface IDeviceService {
  getAllDevices(
    pageOptionsRequest: PageOptionsRequest,
  ): Promise<IBaseResponse<PageDto<DeviceDto>>>;

  syncDevices(
    syncDeviceSyncDeviceOptionRequest: SyncDeviceOptionRequest,
  ): Promise<IBaseResponse<void>>;

  getDataFromStartDateToEndDate(
    id: string,
    startDate: string,
    endDate: string,
    intervalType: string,
  ): Promise<IBaseResponse<IDataResponse[]>>;

  createDevice(requestData: CreateDeviceDto): Promise<IBaseResponse<void>>;

  updateDevice(requestData: UpdateDeviceDto): Promise<IBaseResponse<void>>;

  deleteDevice(id: string): Promise<IBaseResponse<void>>;

  getDeviceById(id: string): Promise<IBaseResponse<DeviceDto>>;
}

export interface IDataResponse {
  ts: string;
  value: number | null;
}
