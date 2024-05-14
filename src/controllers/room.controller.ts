import {
  Controller,
  Get,
  Req,
  Post,
  Body,
  Put,
  Delete,
  Param,
} from '@nestjs/common';
import { RoomService } from '@/services/room.service';
import { Request } from 'express';
import { CreateRoomRequestDto, UpdateRoomRequestDto } from '@/dto/request';
import { IBaseResponse } from '@/interfaces';
import { RoomResponseDto } from '@/dto/response';
import { ApiTags } from '@nestjs/swagger';

@Controller('/rooms')
@ApiTags('Rooms API')
export class RoomController {
  constructor(private roomServive: RoomService) {}

  @Get()
  getAllRooms(@Req() req: Request): Promise<IBaseResponse<RoomResponseDto[]>> {
    return this.roomServive.getAllRooms();
  }

  @Get('/:id')
  getRoomById(
    @Param() params: { id: string },
  ): Promise<IBaseResponse<RoomResponseDto>> {
    return this.roomServive.getRoomById(params.id);
  }

  @Post()
  createRoom(@Body() requestData: CreateRoomRequestDto) {
    return this.roomServive.createRoom(requestData);
  }

  @Put('/:id')
  updateRoom(
    @Param() params: { id: string },
    @Body() requestData: UpdateRoomRequestDto,
  ) {
    return this.roomServive.updateRoom(params.id, requestData);
  }

  @Delete('/:id')
  deleteRoom(@Param() params: { id: string }) {
    return this.roomServive.deleteRoom(params.id);
  }
}
