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
  CreateDeviceRequestDto,
  GetDataStartToEndOptionRequest,
  PageOptionsRequestDto,
  UpdateDeviceRequestDto,
} from '@/dto/request';
import { ApiTags, ApiResponse, ApiParam } from '@nestjs/swagger';
import { HttpStatus } from '@nestjs/common/enums';
import { ApiPaginatedResponse, Public } from '@/decorators';
import { SyncDeviceOptionRequest } from '@/dto/request';

@Controller('/devices')
@ApiTags('Devices API')
export class DeviceController {
  constructor(private deviceService: DeviceService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiPaginatedResponse(DeviceDto)
  async getAllDevices(
    @Query() pageOptionsRequest: PageOptionsRequestDto,
  ): Promise<IBaseResponse<PageDto<DeviceDto>>> {
    return this.deviceService.getAllDevices(pageOptionsRequest);
  }

  @Get('/sync')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Sync device by tags successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Request failed with status code 404',
  })
  async syncDevices(
    @Query() syncDeviceSyncDeviceOptionRequest: SyncDeviceOptionRequest,
  ): Promise<IBaseResponse<void>> {
    return this.deviceService.syncDevices(syncDeviceSyncDeviceOptionRequest);
  }

  @Get('/:id')
  @ApiParam({ name: 'id', required: true, description: 'Device id' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Sync device by location successfully',
  })
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
    @Query() queries: GetDataStartToEndOptionRequest,
  ): Promise<IBaseResponse<IDataResponse[]>> {
    return this.deviceService.getDataFromStartDateToEndDate(params.id, queries);
  }

  // Create new device
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createDevice(@Body() requestData: CreateDeviceRequestDto) {
    return this.deviceService.createDevice(requestData);
  }

  @Put()
  @HttpCode(HttpStatus.OK)
  async updateDevice(@Body() requestData: UpdateDeviceRequestDto) {
    return this.deviceService.updateDevice(requestData);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  async deleteDevice(@Param() params: { id: string }) {
    return this.deviceService.deleteDevice(params.id);
  }
}
