import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Req,
  Res,
  UseFilters,
} from '@nestjs/common';
import { HttpExceptionFilter } from '@/filters';
import { DeviceService } from '@/services/device.service';
import { DeviceDto } from '@/dto';

@Controller('/devices')
@UseFilters(new HttpExceptionFilter())
export class DeviceController {
  constructor(private deviceService: DeviceService) {}

  @Get()
  async findAllDevices(): Promise<DeviceDto[]> {
    return await this.deviceService.findAll();
  }
}
