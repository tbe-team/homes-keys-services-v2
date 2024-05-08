import { Controller, Get, Req, Post, Body } from '@nestjs/common';
import { RoomService } from '@/services/room.service';
import { Request } from 'express';
import { BadRequestException } from '@nestjs/common';
import { CreateRoomRequestDto } from '@/dto/request';

@Controller('/rooms')
export class RoomController {
  constructor(private roomServive: RoomService) {}

  @Get()
  findAll(@Req() req: Request): string {
    throw new BadRequestException([{ errorCode: 403, errorMessage: 'hello' }]);
  }

  @Post()
  createRoom(@Body() requestData: CreateRoomRequestDto) {
    return this.roomServive.createRoom(requestData);
  }
}
