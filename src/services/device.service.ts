import { DeviceDto } from '@/dto';
import { Device } from '@/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { BadRequestException } from '@nestjs/common';

@Injectable()
export class DeviceService {
  constructor(
    @InjectRepository(Device)
    private readonly deviceRepository: Repository<Device>,
    @InjectMapper()
    private readonly mapper: Mapper,
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

  createRoom() {}

  updateRoom() {}

  deleteRoom() {}
}
