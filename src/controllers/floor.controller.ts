import { CreateFloorRequestDto, UpdateFloorRequestDto } from '@/dto/request';
import { FloorReponseDto } from '@/dto/response';
import { IBaseResponse } from '@/interfaces';
import { FloorService } from '@/services';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';

@Controller('/floors')
export class FloorController {
  constructor(private floorService: FloorService) {}

  @Get()
  async getAllFloors(): Promise<IBaseResponse<FloorReponseDto[]>> {
    return this.floorService.getAllFloors();
  }

  @Get('/:id')
  async getFloorById(
    @Param() params: { id: string },
  ): Promise<IBaseResponse<FloorReponseDto>> {
    return this.floorService.getFloorById(params.id);
  }

  @Post()
  async createFloor(@Body() requestData: CreateFloorRequestDto) {
    return this.floorService.createFloor(requestData);
  }

  @Put()
  async updateFloor(@Body() requestData: UpdateFloorRequestDto) {
    return this.floorService.updateFloor(requestData);
  }

  @Delete()
  async deleteFloor(@Param() params: { id: string }) {
    return this.floorService.deleteFloor(params.id);
  }
}
