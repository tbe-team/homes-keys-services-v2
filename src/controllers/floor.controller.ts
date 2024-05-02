import { Controller, Get, Req } from '@nestjs/common';
import { RoomService } from '@/services/room.service';
import { Request } from 'express';
import { BadRequestException } from '@nestjs/common';

@Controller('/floors')
export class FloorController {
  constructor(private roomServive: RoomService) {}

  @Get()
  findAll(@Req() req: Request): string {
    throw new BadRequestException([{ errorCode: 403, errorMessage: 'hello' }]);
  }
}
