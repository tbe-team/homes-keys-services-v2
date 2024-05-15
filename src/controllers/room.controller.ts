import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  Query,
  HttpCode,
} from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';
import { RoomService } from '@/services/room.service';
import {
  CreateRoomRequestDto,
  PageOptionsRequestDto,
  UpdateRoomRequestDto,
} from '@/dto/request';
import { IBaseResponse } from '@/interfaces';
import { PageDto, RoomResponseDto } from '@/dto/response';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { ApiPaginatedResponse } from '@/decorators';

@Controller('/rooms')
@ApiTags('Rooms API')
export class RoomController {
  constructor(private roomServive: RoomService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiPaginatedResponse(RoomResponseDto)
  getAllRooms(
    @Query() queries: PageOptionsRequestDto,
  ): Promise<IBaseResponse<PageDto<RoomResponseDto>>> {
    return this.roomServive.getAllRooms(queries);
  }

  @Get('/:id')
  @ApiParam({ name: 'id', required: true, description: 'Room id' })
  @ApiOkResponse({
    description: 'Get room by id successfully',
    type: RoomResponseDto,
  })
  getRoomById(
    @Param() params: { id: string },
  ): Promise<IBaseResponse<RoomResponseDto>> {
    return this.roomServive.getRoomById(params.id);
  }

  @Post()
  @ApiOkResponse({
    description: 'Room created successfully',
  })
  createRoom(@Body() requestData: CreateRoomRequestDto) {
    return this.roomServive.createRoom(requestData);
  }

  @Put('/:id')
  @ApiParam({ name: 'id', required: true, description: 'Room id' })
  @ApiOkResponse({
    description: 'Room updated successfully',
  })
  updateRoom(
    @Param() params: { id: string },
    @Body() requestData: UpdateRoomRequestDto,
  ) {
    return this.roomServive.updateRoom(params.id, requestData);
  }

  @Delete('/:id')
  @ApiParam({ name: 'id', required: true, description: 'Room id' })
  @ApiOkResponse({
    description: 'Room deleted successfully',
  })
  deleteRoom(@Param() params: { id: string }) {
    return this.roomServive.deleteRoom(params.id);
  }
}
