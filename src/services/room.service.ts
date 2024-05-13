import { CreateRoomRequestDto, UpdateRoomRequestDto } from '@/dto/request';
import { RoomResponseDto } from '@/dto/response';
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

  async getRoomById(id: string): Promise<IBaseResponse<RoomResponseDto>> {
    const room = await this.roomRepository.findOne({
      where: { id },
    });
    if (!room) throw new NotFoundException(`Room ${id} could not be found`);

    const roomDto = await this.mapper.mapAsync(room, Room, RoomResponseDto);

    return {
      error: false,
      message: `Room ${room.id} retrieved successfully`,
      statusCode: HttpStatus.OK,
      data: roomDto,
    };
  }

  async updateRoom(
    id: string,
    requestData: UpdateRoomRequestDto,
  ): Promise<IBaseResponse<void>> {
    const room = await this.roomRepository.findOne({
      where: { id },
    });
    if (!room) throw new NotFoundException(`Room ${id} could not be found`);

    room.acreage = requestData.acreage;
    room.status = requestData.status;
    room.price = requestData.price;
    room.name = requestData.name;
    room.description = requestData.description;
    await this.roomRepository.save(room);
    return {
      error: false,
      message: `Room ${room.id} updated successfully`,
      statusCode: HttpStatus.OK,
    };
  }

  async deleteRoom(id: string): Promise<IBaseResponse<void>> {
    const room = await this.roomRepository.findOne({
      where: { id },
    });
    if (!room) throw new NotFoundException(`Room ${id} could not be found`);
    await this.roomRepository.delete(room);
    return {
      error: false,
      message: `Room ${id} deleted successfully`,
      statusCode: HttpStatus.OK,
    };
  }

  async getAllRooms(): Promise<IBaseResponse<RoomResponseDto[]>> {
    const rooms = await this.roomRepository.find();
    const roomDtos = await this.mapper.mapArrayAsync(
      rooms,
      Room,
      RoomResponseDto,
    );
    return {
      error: false,
      message: 'Get all rooms successfully',
      statusCode: HttpStatus.OK,
      data: roomDtos,
    };
  }

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
      message: `Room ${room.id} created successfully`,
      statusCode: HttpStatus.OK,
    };
  }
}
