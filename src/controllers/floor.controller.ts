import { ApiPaginatedResponse } from '@/decorators';
import {
  CreateFloorRequestDto,
  PageOptionsRequestDto,
  UpdateFloorRequestDto,
} from '@/dto/request';
import { FloorReponseDto, PageDto } from '@/dto/response';
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
} from '@nestjs/common';
import { HttpCode, Query } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';

@Controller('/floors')
@ApiTags('Floors API')
export class FloorController {
  constructor(private floorService: FloorService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiPaginatedResponse(FloorReponseDto)
  async getAllFloors(
    @Query() queries: PageOptionsRequestDto,
  ): Promise<IBaseResponse<PageDto<FloorReponseDto>>> {
    return this.floorService.getAllFloors(queries);
  }

  @Get('/:id')
  @ApiParam({ name: 'id', required: true, description: 'Floor id' })
  @ApiOkResponse({
    description: 'Get floor by id successfully',
    type: FloorReponseDto,
  })
  async getFloorById(
    @Param() params: { id: string },
  ): Promise<IBaseResponse<FloorReponseDto>> {
    return this.floorService.getFloorById(params.id);
  }

  @Post()
  @ApiOkResponse({
    description: 'Floor created successfully',
  })
  async createFloor(@Body() requestData: CreateFloorRequestDto) {
    return this.floorService.createFloor(requestData);
  }

  @Put()
  @ApiParam({ name: 'id', required: true, description: 'Floor id' })
  @ApiOkResponse({
    description: 'Floor updated successfully',
  })
  async updateFloor(@Body() requestData: UpdateFloorRequestDto) {
    return this.floorService.updateFloor(requestData);
  }

  @Delete()
  @ApiParam({ name: 'id', required: true, description: 'Floor id' })
  @ApiOkResponse({
    description: 'Floor deleted successfully',
  })
  async deleteFloor(@Param() params: { id: string }) {
    return this.floorService.deleteFloor(params.id);
  }
}
