import { DeviceDto } from '@/dto/response';
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
import { IBaseResponse, IDataResponse, IDeviceService } from '@/interfaces';

interface IDevice {
  id: string;
  name: string;
  description: string;
  is_gateway: boolean;
  tags: string[];
  created_at: string;
}

@Injectable()
export class DeviceService implements IDeviceService {
  private tbeBaseUrl: string;
  private logger: Logger;
  private accessToken: string;

  constructor(
    @InjectRepository(Device)
    private readonly deviceRepository: Repository<Device>,
    @InjectMapper()
    private readonly mapper: Mapper,
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.tbeBaseUrl = this.configService.get<string>('tbeBaseUrl') || '';
    this.logger = new Logger(DeviceService.name);
    this.accessToken = this.configService.get<string>('tbeAccessToken') || '';
  }

  async getDataFromStartDateToEndDate(
    id: string,
    startDate: string,
    endDate: string,
    intervalType: string,
  ): Promise<IBaseResponse<IDataResponse[]>> {
    const key = encodeURIComponent('Total kWh');
    const interval = 1;
    const aggType = 'MAX';
    const limit = 100;
    const formatedStartDate = encodeURIComponent(`${startDate}T00:00:00+07:00`);
    const formatedEndDate = encodeURIComponent(`${endDate}T23:59:59+07:00`);

    const requestUrl = `${this.tbeBaseUrl}/telemetry/metrics/values?device_id=${id}&key=${key}&start=${formatedStartDate}&end=${formatedEndDate}&interval_type=${intervalType}&interval=${interval}&agg_type=${aggType}&limit=${limit}`;
    this.logger.log({ requestUrl });

    try {
      const response: IDataResponse[] = await firstValueFrom(
        this.httpService.get(requestUrl, {
          headers: {
            Accept: 'application/json',
            'X-API-Key': this.accessToken,
          },
        }),
      ).then((data) => data.data);

      return {
        message: 'Get all data from start date to end date successfully',
        statusCode: HttpStatus.OK,
        error: false,
        data: response,
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async findAll(): Promise<DeviceDto[]> {
    try {
      return this.mapper.mapArrayAsync(
        await this.deviceRepository.find(),
        Device,
        DeviceDto,
      );
    } catch (ex) {
      this.logger.error(ex);
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
    let res: AxiosResponse<{ items: IDevice[] }, any> = null;
    this.logger.log(`{ Request url: ${requestUrl} }`);

    try {
      res = await firstValueFrom(
        this.httpService.get(requestUrl, {
          headers: {
            Accept: 'application/json',
            'X-API-Key': this.accessToken,
          },
        }),
      );
    } catch (error) {
      if (error instanceof AxiosError) {
        this.logger.error(`{ Error when fetching devices: ${error.message} }`);
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
      this.logger.log('{ Save all devices successfully }');
    } else {
      this.logger.log(`{ Error when fetching devices }`);
    }
    return {
      message: 'Save all devices successfully',
      statusCode: HttpStatus.OK,
      error: false,
    };
  }
}
