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
import { AxiosError, AxiosResponse } from 'axios';
import { HttpStatus } from '@nestjs/common/enums';
import { DeviceStatus, DeviceType } from '@/enums';
import { Logger } from '@nestjs/common/services';
import { ConfigService } from '@nestjs/config';
import { IBaseResponse } from '@/interfaces';

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
      throw new BadRequestException();
    }
  }

  async syncDevicesByLocation(
    location: string,
    pageSize: string,
    page: string,
  ): Promise<IBaseResponse<void>> {
    // Fetching data
    const requestUrl = `${this.tbeBaseUrl}/devices?tags=${location}&page_size=${pageSize}&page=${page}`;
    const accessToken = this.configService.get('accessToken') || '';
    let res: AxiosResponse<{ items: IDevice[] }, any> = null;
    Logger.log(`{ Request url: ${requestUrl} }`);
    try {
      res = await firstValueFrom(
        this.httpService.get(requestUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }),
      );
    } catch (error) {
      if (error instanceof AxiosError) {
        Logger.error(`{ Error when fetching devices: ${error.message} }`);
      }
      throw new BadRequestException(error);
    }

    // Validate & save data
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
      Logger.log('{ Save all devices successfully }');
    } else {
      Logger.log(`{ Error when fetching devices }`);
    }
    return {
      message: 'Save all devices successfully',
      statusCode: HttpStatus.OK,
      error: false,
    };
  }
}
