import { Controller, Post, Body } from '@nestjs/common';
import { CreateMotelRoomRequestDto } from '@/dto/request';
import { MotelRoomService } from '@/services';
import { IBaseResponse } from '@/interfaces';

@Controller('/motels')
export class MotelRoomController {
  constructor(private motelRoomService: MotelRoomService) {}

  @Post()
  createRoom(
    @Body() request: CreateMotelRoomRequestDto,
  ): Promise<IBaseResponse<void>> {
    return this.motelRoomService.createMotelRoom(request);
  }
}
