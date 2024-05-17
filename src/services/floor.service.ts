import {
  FloorReponseDto,
  PageDto,
  PageMetaDto,
  RoomResponseDto,
} from '@/dto/response';
import { Floor, MotelRoom } from '@/entities';
import { IBaseResponse, IFloorService } from '@/interfaces';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Logger } from '@nestjs/common/services';
import { HttpStatus } from '@nestjs/common/enums';
import {
  CreateFloorRequestDto,
  PageOptionsRequestDto,
  UpdateFloorRequestDto,
} from '@/dto/request';
import {
  BadRequestException,
  NotFoundException,
} from '@nestjs/common/exceptions';

@Injectable()
export class FloorService implements IFloorService {
  private logger: Logger;
  constructor(
    @InjectRepository(Floor)
    private readonly floorRepository: Repository<Floor>,
    @InjectRepository(MotelRoom)
    private readonly motelRoomRepository: Repository<MotelRoom>,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {
    this.logger = new Logger(FloorService.name);
  }

  async getFloorById(id: string): Promise<IBaseResponse<FloorReponseDto>> {
    const floor = await this.floorRepository.findOne({ where: { id } });
    if (!floor) throw new NotFoundException(`Floor ${id} could not be found`);

    const floorDto = await this.mapper.mapAsync(floor, Floor, FloorReponseDto);
    return {
      error: false,
      message: `Floor ${id} found`,
      statusCode: HttpStatus.OK,
      data: floorDto,
    };
  }

  async createFloor(
    requestData: CreateFloorRequestDto,
  ): Promise<IBaseResponse<void>> {
    const motelRoom = await this.motelRoomRepository.findOne({
      where: { id: requestData.motelRoomId },
    });
    if (!motelRoom)
      throw new NotFoundException('Motel room could not be found');

    const floor = await this.mapper.mapAsync(
      requestData,
      CreateFloorRequestDto,
      Floor,
    );
    floor.motelRoom = motelRoom;
    await this.floorRepository.save(floor);
    return {
      error: false,
      message: `Floor ${floor.id} created successfully`,
      statusCode: HttpStatus.OK,
    };
  }

  updateFloor(
    requestData: UpdateFloorRequestDto,
  ): Promise<IBaseResponse<void>> {
    throw new Error('Method not implemented.');
  }

  deleteFloor(id: string): Promise<IBaseResponse<void>> {
    throw new Error('Method not implemented.');
  }

  async getAllFloors(
    queries: PageOptionsRequestDto,
  ): Promise<IBaseResponse<PageDto<FloorReponseDto>>> {
    try {
      const queryBuilder = this.floorRepository.createQueryBuilder('floor');
      queryBuilder
        .orderBy('floor.createdAt', queries.orderBy)
        .skip(queries.skip)
        .take(queries.take);
      const itemCount = await queryBuilder.getCount();
      const { entities } = await queryBuilder.getRawAndEntities();
      const floors = await this.mapper.mapArrayAsync(
        entities,
        Floor,
        FloorReponseDto,
      );
      const pageMetaDto = new PageMetaDto({
        itemCount,
        pageOptions: queries,
      });

      return {
        error: false,
        message: 'Get all rooms successfully',
        statusCode: HttpStatus.OK,
        data: new PageDto(floors, pageMetaDto),
      };
    } catch (ex) {
      this.logger.error(ex);
      throw new BadRequestException(ex);
    }
  }
}
