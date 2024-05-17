import {
  CreateDeviceRequestDto,
  GetDataStartToEndOptionRequest,
  PageOptionsRequestDto,
  SyncDeviceOptionRequest,
  UpdateDeviceRequestDto,
} from '@/dto/request';
import { DeviceDto, PageDto } from '@/dto/response';
import { IBaseResponse } from './base.interface';

export interface IDeviceService {
  getAllDevices(
    pageOptionsRequest: PageOptionsRequestDto,
  ): Promise<IBaseResponse<PageDto<DeviceDto>>>;

  syncDevices(
    syncDeviceSyncDeviceOptionRequest: SyncDeviceOptionRequest,
  ): Promise<IBaseResponse<void>>;

  getDataFromStartDateToEndDate(
    id: string,
    queries: GetDataStartToEndOptionRequest,
  ): Promise<IBaseResponse<IDataResponse[]>>;

  createDevice(
    requestData: CreateDeviceRequestDto,
  ): Promise<IBaseResponse<void>>;

  updateDevice(
    requestData: UpdateDeviceRequestDto,
  ): Promise<IBaseResponse<void>>;

  deleteDevice(id: string): Promise<IBaseResponse<void>>;

  getDeviceById(id: string): Promise<IBaseResponse<DeviceDto>>;
}

export interface IDataResponse {
  ts: string;
  value: number | null;
}
