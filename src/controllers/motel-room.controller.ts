import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import {
  CreateMotelRoomRequestDto,
  PageOptionsRequestDto,
  UpdateMotelRequestDto,
} from '@/dto/request';
import { MotelRoomService } from '@/services';
import { IBaseResponse } from '@/interfaces';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { Delete, Param, Put, Query } from '@nestjs/common/decorators';
import { ApiPaginatedResponse, CheckPolicies } from '@/decorators';
import { MotelResponseDto } from '@/dto/response';
import { PoliciesGuard } from '@/guards';
import { AppAbility } from '@/factories';
import { Action } from '@/enums';
import { MotelRoom } from '@/entities';
import { ReadMotelPolicyHandler, UpdateMotelPolicyHandler } from '@/handlers';

@Controller('/motels')
@ApiTags('Motel Room API')
export class MotelRoomController {
  constructor(private motelRoomService: MotelRoomService) {}

  @Post()
  @ApiOkResponse({
    description: 'Motel created successfully',
  })
  createMotel(
    @Body() request: CreateMotelRoomRequestDto,
  ): Promise<IBaseResponse<void>> {
    return this.motelRoomService.createMotelRoom(request);
  }

  @Get()
  @ApiPaginatedResponse(MotelResponseDto)
  @UseGuards(PoliciesGuard)
  @CheckPolicies(ReadMotelPolicyHandler)
  getAllMotels(@Query() queries: PageOptionsRequestDto) {
    return this.motelRoomService.getAllMotels(queries);
  }

  @Get('/:id')
  @ApiParam({ name: 'id', required: true, description: 'Motel id' })
  @ApiOkResponse({
    description: 'Get motel by id successfully',
    type: MotelResponseDto,
  })
  getMotelById(@Param() params: { id: string }) {
    return this.motelRoomService.getMotelById(params.id);
  }

  @Put('/:id')
  @UseGuards(PoliciesGuard)
  @CheckPolicies(UpdateMotelPolicyHandler)
  @ApiParam({ name: 'id', required: true, description: 'Motel id' })
  @ApiOkResponse({
    description: 'Motel updated successfully',
  })
  updateMotel(
    @Body() requestData: UpdateMotelRequestDto,
    @Param() params: { id: string },
  ) {
    return this.motelRoomService.updateMotel(params.id, requestData);
  }

  @Delete('/:id')
  @ApiParam({ name: 'id', required: true, description: 'Motel id' })
  @ApiOkResponse({
    description: 'Motel deleted successfully',
  })
  deleteMotel(@Param() params: { id: string }) {
    return this.motelRoomService.deleteMotel(params.id);
  }
}
