import { CreateRoomRequestDto } from '@/dto/request';
import { Floor } from '@/entities';
import { Room } from '@/entities/room.entity';
import { IBaseResponse, IRoomService } from '@/interfaces';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RoomService implements IRoomService {
  constructor(
    @InjectRepository(Room)
    private roomRepository: Repository<Room>,

    @InjectRepository(Floor)
    private floorRepository: Repository<Floor>,

    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  async createRoom(
    requestData: CreateRoomRequestDto,
  ): Promise<IBaseResponse<void>> {
    const floor = await this.floorRepository.findOne({
      where: { id: requestData.floorId },
    });
    if (!floor)
      throw new NotFoundException(
        `Floor ${requestData.floorId} could not be found`,
      );

    const room = await this.mapper.mapAsync(
      requestData,
      CreateRoomRequestDto,
      Room,
    );
    room.floor = floor;

    try {
      await this.roomRepository.save(room);
    } catch (e) {
      throw new BadRequestException(e);
    }

    return {
      error: false,
      message: `Room ${room.id} found`,
      statusCode: HttpStatus.OK,
    };
  }

  findAll(): Promise<Room[]> {
    return this.roomRepository.find();
  }

  updateRoom() {}

  deleteRoom() {}
}
