import { CreateMotelRoomRequestDto } from '@/dto/request';
import { MotelRoom } from '@/entities';
import { IBaseResponse, IMotelRoomService } from '@/interfaces';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HttpStatusCode } from 'axios';
import { Repository } from 'typeorm';

@Injectable()
export class MotelRoomService implements IMotelRoomService {
  constructor(
    @InjectRepository(MotelRoom)
    private readonly motelRoomRepository: Repository<MotelRoom>,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  async createMotelRoom(
    request: CreateMotelRoomRequestDto,
  ): Promise<IBaseResponse<void>> {
    const requestData = await this.mapper.mapAsync(
      request,
      CreateMotelRoomRequestDto,
      MotelRoom,
    );
    await this.motelRoomRepository.save(requestData);
    return {
      message: 'Create motel room successfully',
      statusCode: HttpStatusCode.Created,
      error: false,
    };
  }
}
