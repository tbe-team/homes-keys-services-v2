import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Req,
  Res,
  UseFilters,
  Query,
  Logger,
} from '@nestjs/common';
import { HttpExceptionFilter } from '@/filters';
import { DeviceService } from '@/services/device.service';
import { DeviceDto } from '@/dto';

@Controller('devices')
@UseFilters(new HttpExceptionFilter())
export class DeviceController {
  constructor(private deviceService: DeviceService) {}

  @Get()
  async findAllDevices(): Promise<DeviceDto[]> {
    return await this.deviceService.findAll();
  }

  @Get('sync')
  async syncDevicesByLocation(@Query('locations') locations: string) {
    Logger.log(`{ Locations: ${locations} }`);
    this.deviceService.syncDevicesByLocations(locations);
    return 'oke';
    // return new Promise((reslove) => reslove('ok'));
  }
}
