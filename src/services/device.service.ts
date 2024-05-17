import { DeviceDto, PageDto, PageMetaDto } from '@/dto/response';
import { Device, Room } from '@/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { BadRequestException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { AxiosError, AxiosResponse } from 'axios';
import { HttpStatus } from '@nestjs/common/enums';
import { DeviceStatus, DeviceType } from '@/enums';
import { Logger } from '@nestjs/common/services';
import { ConfigService } from '@nestjs/config';
import { IBaseResponse, IDataResponse, IDeviceService } from '@/interfaces';
import {
  CreateDeviceRequestDto,
  GetDataStartToEndOptionRequest,
  PageOptionsRequestDto,
  SyncDeviceOptionRequest,
  UpdateDeviceRequestDto,
} from '@/dto/request';
import { NotFoundException } from '@nestjs/common/exceptions';

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
    @InjectRepository(Room)
    private readonly roomRepository: Repository<Room>,
    @InjectMapper()
    private readonly mapper: Mapper,
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {
    this.tbeBaseUrl = this.configService.get<string>('tbeBaseUrl') || '';
    this.logger = new Logger(DeviceService.name);
    this.accessToken = this.configService.get<string>('tbeAccessToken') || '';
  }

  async getDeviceById(id: string): Promise<IBaseResponse<DeviceDto>> {
    const devive = await this.deviceRepository.findOne({ where: { id } });
    if (!devive) throw new NotFoundException('Device could not be found');
    console.log({ room: devive.room, devive });
    const deviveDto = await this.mapper.mapAsync(devive, Device, DeviceDto);
    return {
      data: deviveDto,
      error: false,
      message: `Devive ${deviveDto.id} found`,
      statusCode: HttpStatus.OK,
    };
  }

  async updateDevice(
    requestData: UpdateDeviceRequestDto,
  ): Promise<IBaseResponse<void>> {
    const device = await this.deviceRepository.findOne({
      where: { id: requestData.id },
    });
    if (!device) throw new NotFoundException('Device could not be found');

    // device.status = requestData.status;
    device.name = requestData.name;
    device.description = requestData.description;
    device.location = requestData.location;
    device.isGateway = requestData.isGateway;
    this.deviceRepository.save(device);

    return {
      message: 'Update device successfully',
      statusCode: HttpStatus.OK,
      error: false,
    };
  }

  async deleteDevice(id: string): Promise<IBaseResponse<void>> {
    const deleteResult = await this.deviceRepository.delete(id);
    this.logger.log({ deleteResult: deleteResult.affected });
    return {
      message: 'Delete device successfully',
      statusCode: HttpStatus.OK,
      error: false,
    };
  }

  async createDevice(
    requestData: CreateDeviceRequestDto,
  ): Promise<IBaseResponse<void>> {
    // Get room
    const room = await this.roomRepository.findOne({
      where: { id: requestData.roomId },
    });
    if (!room) throw new NotFoundException('Room could not be found');

    // Map request to entity
    const device = await this.mapper.mapAsync(
      requestData,
      CreateDeviceRequestDto,
      Device,
    );
    device.room = room;
    this.logger.log({ device });

    // Create device
    await this.deviceRepository.save(device);
    this.logger.log(`Create new devive: ${device.id}`);

    return {
      message: `Create device ${device.id} successfully`,
      statusCode: HttpStatus.CREATED,
      error: false,
    };
  }

  async getDataFromStartDateToEndDate(
    id: string,
    queries: GetDataStartToEndOptionRequest,
  ): Promise<IBaseResponse<IDataResponse[]>> {
    const key = encodeURIComponent('Total kWh');
    const interval = 1;
    const aggType = 'MAX';
    const limit = 100;
    const formatedStartDate = encodeURIComponent(
      `${queries.startDate}T00:00:00+07:00`,
    );
    const formatedEndDate = encodeURIComponent(
      `${queries.endDate}T23:59:59+07:00`,
    );

    const requestUrl = `${this.tbeBaseUrl}/telemetry/metrics/values?device_id=${id}&key=${key}&start=${formatedStartDate}&end=${formatedEndDate}&interval_type=${queries.intervalType}&interval=${interval}&agg_type=${aggType}&limit=${limit}`;
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

  async getAllDevices(
    pageOptionsRequest: PageOptionsRequestDto,
  ): Promise<IBaseResponse<PageDto<DeviceDto>>> {
    try {
      const queryBuilder = this.deviceRepository.createQueryBuilder('device');
      queryBuilder
        .orderBy('device.createdAt', pageOptionsRequest.orderBy)
        .skip(pageOptionsRequest.skip)
        .take(pageOptionsRequest.take);
      const itemCount = await queryBuilder.getCount();
      const { entities } = await queryBuilder.getRawAndEntities();
      const deviceDtos = await this.mapper.mapArrayAsync(
        entities,
        Device,
        DeviceDto,
      );
      const pageMetaDto = new PageMetaDto({
        itemCount,
        pageOptions: pageOptionsRequest,
      });

      return {
        error: false,
        message: 'Get all devices successfully',
        statusCode: HttpStatus.OK,
        data: new PageDto(deviceDtos, pageMetaDto),
      };
    } catch (ex) {
      this.logger.error(ex);
      throw new BadRequestException();
    }
  }

  async syncDevices(
    syncDeviceSyncDeviceOptionRequest: SyncDeviceOptionRequest,
  ): Promise<IBaseResponse<void>> {
    // Make query builder
    let queryBuilder = `page_size=${syncDeviceSyncDeviceOptionRequest.take}&page=${syncDeviceSyncDeviceOptionRequest.page}`;
    if (syncDeviceSyncDeviceOptionRequest.tags) {
      queryBuilder += `&tags=${syncDeviceSyncDeviceOptionRequest.tags}`;
    }
    const requestUrl = `${this.tbeBaseUrl}/devices?${queryBuilder}`;
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
      throw new NotFoundException(error);
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
      this.logger.log('{ Sync all devices successfully }');
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
