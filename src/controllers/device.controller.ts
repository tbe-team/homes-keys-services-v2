import { Controller, Get, Query, HttpStatus } from '@nestjs/common';
import { DeviceService } from '@/services/device.service';
import { DeviceDto } from '@/dto/response';
import { IBaseResponse } from '@/interfaces';

@Controller('/devices')
export class DeviceController {
  constructor(private deviceService: DeviceService) {}

  @Get()
  async findAllDevices(): Promise<IBaseResponse<DeviceDto[]>> {
    const devices: DeviceDto[] = await this.deviceService.findAll();
    const response: IBaseResponse<DeviceDto[]> = {
      message: 'Get all devices sucessfully',
      statusCode: HttpStatus.OK,
      error: false,
      data: devices,
    };
    return response;
  }

  @Get('/sync')
  async syncDevicesByLocation(
    @Query('location') location: string,
    @Query('pageSize') pageSize: string,
    @Query('page') page: string,
  ): Promise<IBaseResponse<void>> {
    return this.deviceService.syncDevicesByLocation(location, pageSize, page);
  }
}
