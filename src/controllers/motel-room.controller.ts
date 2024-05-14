import { Controller, Post, Body, Get } from '@nestjs/common';
import { CreateMotelRoomRequestDto } from '@/dto/request';
import { MotelRoomService } from '@/services';
import { IBaseResponse } from '@/interfaces';
import { ApiTags } from '@nestjs/swagger';

@Controller('/motels')
@ApiTags('Motel Room API')
export class MotelRoomController {
  constructor(private motelRoomService: MotelRoomService) {}

  @Post()
  createRoom(
    @Body() request: CreateMotelRoomRequestDto,
  ): Promise<IBaseResponse<void>> {
    return this.motelRoomService.createMotelRoom(request);
  }
}
