import { DeviceDto } from '@/dto';
import { Device } from '@/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { BadRequestException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom, Observable } from 'rxjs';
import { AxiosResponse } from 'axios';
import { HttpStatus } from '@nestjs/common/enums';
import { DeviceStatus, DeviceType } from '@/enums';
import { Logger } from '@nestjs/common/services';
import { ConfigService } from '@nestjs/config';

interface IDevice {
  id: string;
  name: string;
  description: string;
  is_gateway: boolean;
  tags: string[];
  created_at: string;
}

@Injectable()
export class DeviceService {
  private readonly tbeBaseUrl = this.configService.get<string>('tbeBaseUrl');
  constructor(
    @InjectRepository(Device)
    private readonly deviceRepository: Repository<Device>,
    @InjectMapper()
    private readonly mapper: Mapper,
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}

  async findAll(): Promise<DeviceDto[]> {
    try {
      return this.mapper.mapArrayAsync(
        await this.deviceRepository.find(),
        Device,
        DeviceDto,
      );
    } catch (ex) {
      throw new BadRequestException(ex);
    }
  }

  async syncDevicesByLocations(locations: string) {
    const url = `${this.tbeBaseUrl}/devices?tags=${locations}&page_size=100&page=1`;
    Logger.log(`{ Url: ${url} }`);
    const res: AxiosResponse<{ items: IDevice[] }, any> = await firstValueFrom(
      this.httpService.get(url),
    );
    if (res.status === HttpStatus.OK) {
      const devices: Device[] = res.data.items.map((item) => {
        const device = new Device();
        device.id = item.id;
        device.name = item.name;
        device.status = DeviceStatus.ACTIVATED;
        device.description = item.description;
        device.type = DeviceType.ELECTRIC;
        device.isGateway = item.is_gateway;
        return device;
      });
      this.deviceRepository.save(devices);
      Logger.log('Save all devices successfully');
    } else {
      Logger.error('Something went wrong');
    }
  }
}
