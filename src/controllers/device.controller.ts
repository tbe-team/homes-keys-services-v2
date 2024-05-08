import {
  Controller,
  Get,
  Query,
  HttpStatus,
  Param,
  Post,
  Body,
  Put,
  Delete,
} from '@nestjs/common';
import { DeviceService } from '@/services/device.service';
import { DeviceDto } from '@/dto/response';
import { IBaseResponse, IDataResponse } from '@/interfaces';
import { CreateDeviceDto, UpdateDeviceDto } from '@/dto/request';

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

  @Get('/:id')
  async getDeviceById(@Param() params: { id: string }) {
    return this.deviceService.getDeviceById(params.id);
  }

  @Get('/sync')
  async syncDevicesByLocation(
    @Query('location') location: string,
    @Query('pageSize') pageSize: string,
    @Query('page') page: string,
  ): Promise<IBaseResponse<void>> {
    return this.deviceService.syncDevicesByLocation(location, pageSize, page);
  }

  // Get data from startDate to endDate with interval type
  // StartDate format: 2023-10-03
  // EndDate format: 2023-10-04
  // Interval type format: DAY, HOUR, MINUTE, SECOND
  @Get('/:id/dataFromStartDateToEndDate')
  async getDataFromStartDateToEndDate(
    @Param() params: { id: string },
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('intervalType') intervalType: string,
  ): Promise<IBaseResponse<IDataResponse[]>> {
    return this.deviceService.getDataFromStartDateToEndDate(
      params.id,
      startDate,
      endDate,
      intervalType,
    );
  }

  // Create new device
  @Post()
  async createDevice(@Body() requestData: CreateDeviceDto) {
    return this.deviceService.createDevice(requestData);
  }

  @Put()
  async updateDevice(@Body() requestData: UpdateDeviceDto) {
    return this.deviceService.updateDevice(requestData);
  }

  @Delete('/:id')
  async deleteDevice(@Param() params: { id: string }) {
    return this.deviceService.deleteDevice(params.id);
  }
}
