import {
  Controller,
  Get,
  Query,
  Param,
  Post,
  Body,
  Put,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { DeviceService } from '@/services/device.service';
import { DeviceDto, PageDto } from '@/dto/response';
import { IBaseResponse, IDataResponse } from '@/interfaces';
import {
  CreateDeviceDto,
  PageOptionsRequest,
  UpdateDeviceDto,
} from '@/dto/request';
import { ApiTags } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common/enums';
import { ApiPaginatedResponse } from '@/decorators';

@Controller('/devices')
@ApiTags('Devices API')
export class DeviceController {
  constructor(private deviceService: DeviceService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiPaginatedResponse(DeviceDto)
  async getAllDevices(
    @Query() pageOptionsRequest: PageOptionsRequest,
  ): Promise<IBaseResponse<PageDto<DeviceDto>>> {
    return this.deviceService.getAllDevices(pageOptionsRequest);
  }

  @Get('/sync')
  @HttpCode(HttpStatus.OK)
  async syncDevicesByLocation(
    @Query('location') location: string,
    @Query('pageSize') pageSize: string,
    @Query('page') page: string,
  ): Promise<IBaseResponse<void>> {
    return this.deviceService.syncDevicesByLocation(location, pageSize, page);
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  async getDeviceById(@Param() params: { id: string }) {
    return this.deviceService.getDeviceById(params.id);
  }

  // Get data from startDate to endDate with interval type
  // StartDate format: 2023-10-03
  // EndDate format: 2023-10-04
  // Interval type format: DAY, HOUR, MINUTE, SECOND
  @Get('/:id/dataFromStartDateToEndDate')
  @HttpCode(HttpStatus.OK)
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
  @HttpCode(HttpStatus.CREATED)
  async createDevice(@Body() requestData: CreateDeviceDto) {
    return this.deviceService.createDevice(requestData);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  async updateDevice(@Body() requestData: UpdateDeviceDto) {
    return this.deviceService.updateDevice(requestData);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  async deleteDevice(@Param() params: { id: string }) {
    return this.deviceService.deleteDevice(params.id);
  }
}
