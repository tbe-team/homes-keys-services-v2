import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Req,
  Res,
  UseFilters,
} from '@nestjs/common';
import { RoomService } from '@/services/room.service';
import { Request } from 'express';
import { HttpExceptionFilter } from '@/filters';
import { BadRequestException } from '@nestjs/common';

@Controller('/rooms')
@UseFilters(new HttpExceptionFilter())
export class RoomController {
  constructor(private roomServive: RoomService) {}

  @Get()
  findAll(@Req() req: Request): string {
    throw new BadRequestException();
  }
}
