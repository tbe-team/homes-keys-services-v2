import {
  CreateMotelRoomRequestDto,
  PageOptionsRequestDto,
  UpdateMotelRequestDto,
} from '@/dto/request';
import { MotelRoom } from '@/entities';
import { IBaseResponse, IMotelRoomService } from '@/interfaces';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatusCode } from 'axios';
import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common/services';
import { PageDto, MotelResponseDto, PageMetaDto } from '@/dto/response';
import { HttpStatus } from '@nestjs/common/enums';
import {
  BadRequestException,
  NotFoundException,
} from '@nestjs/common/exceptions';

@Injectable()
export class MotelRoomService implements IMotelRoomService {
  private logger: Logger;
  constructor(
    @InjectRepository(MotelRoom)
    private readonly motelRoomRepository: Repository<MotelRoom>,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {
    this.logger = new Logger(MotelRoomService.name);
  }

  async getAllMotels(
    queries: PageOptionsRequestDto,
  ): Promise<IBaseResponse<PageDto<MotelResponseDto>>> {
    try {
      const queryBuilder = this.motelRoomRepository.createQueryBuilder('motel');
      queryBuilder
        .orderBy('motel.createdAt', queries.orderBy)
        .skip(queries.skip)
        .take(queries.take);
      const itemCount = await queryBuilder.getCount();
      const { entities } = await queryBuilder.getRawAndEntities();
      const floors = await this.mapper.mapArrayAsync(
        entities,
        MotelRoom,
        MotelResponseDto,
      );
      const pageMetaDto = new PageMetaDto({
        itemCount,
        pageOptions: queries,
      });

      return {
        error: false,
        message: 'Get all motels successfully',
        statusCode: HttpStatus.OK,
        data: new PageDto(floors, pageMetaDto),
      };
    } catch (ex) {
      this.logger.error(ex);
      throw new BadRequestException(ex);
    }
  }

  async getMotelById(id: string): Promise<IBaseResponse<MotelResponseDto>> {
    const motel = await this.motelRoomRepository.findOne({ where: { id } });
    if (!motel) throw new NotFoundException(`Motel ${id} could not be found`);
    return {
      error: false,
      message: `Get motel ${id} successfully`,
      statusCode: HttpStatus.OK,
      data: await this.mapper.mapAsync(motel, MotelRoom, MotelResponseDto),
    };
  }

  async updateMotel(
    id: string,
    requestData: UpdateMotelRequestDto,
  ): Promise<IBaseResponse<void>> {
    const motel = await this.motelRoomRepository.findOne({ where: { id } });
    if (!motel) throw new NotFoundException(`Motel ${id} could not be found`);

    motel.minPrice = requestData.minPrice;
    motel.maxPrice = requestData.maxPrice;
    motel.contactPhone = requestData.contactPhone;
    motel.price = requestData.price;
    motel.name = requestData.name;
    motel.description = requestData.description;

    await this.motelRoomRepository.save(motel);
    return {
      error: false,
      message: `Motel ${motel.id} updated successfully`,
      statusCode: HttpStatus.OK,
    };
  }

  async deleteMotel(id: string): Promise<IBaseResponse<void>> {
    const motel = await this.motelRoomRepository.findOne({ where: { id } });
    if (!motel) throw new NotFoundException(`Motel ${id} could not be found`);

    await this.motelRoomRepository.delete(motel);
    return {
      error: false,
      message: `Motel ${id} deleted successfully`,
      statusCode: HttpStatus.OK,
    };
  }

  async createMotelRoom(
    request: CreateMotelRoomRequestDto,
  ): Promise<IBaseResponse<void>> {
    const requestData = await this.mapper.mapAsync(
      request,
      CreateMotelRoomRequestDto,
      MotelRoom,
    );

    const motel = await this.motelRoomRepository.save(requestData);

    return {
      message: `Motel ${motel.id} created successfully`,
      statusCode: HttpStatusCode.Created,
      error: false,
    };
  }
}
