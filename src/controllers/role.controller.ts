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
import {
  CreateRoleRequestDto,
  CreateRoomRequestDto,
  PageOptionsRequestDto,
  UpdateRoleRequestDto,
  UpdateRoomRequestDto,
} from '@/dto/request';
import { IBaseResponse } from '@/interfaces';
import { PageDto, RoleResponseDto } from '@/dto/response';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { ApiPaginatedResponse } from '@/decorators';
import { RoleService } from '@/services';

@Controller('/roles')
@ApiTags('Roles API')
export class RoleController {
  constructor(private roleServive: RoleService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiPaginatedResponse(RoleResponseDto)
  getAllRoles(
    @Query() queries: PageOptionsRequestDto,
  ): Promise<IBaseResponse<PageDto<RoleResponseDto>>> {
    return this.roleServive.getAllRoles({ queries });
  }

  // @Get('/:id')
  // @ApiParam({ name: 'id', required: true, description: 'Role id' })
  // @ApiOkResponse({
  //   description: 'Get role by id successfully',
  //   type: RoleResponseDto,
  // })
  // getRoleById(
  //   @Param() params: { id: string },
  // ): Promise<IBaseResponse<RoleResponseDto>> {
  //   return null;
  //   // return this.roomServive.getRoomById(params.id);
  // }

  @Post()
  @ApiOkResponse({
    description: 'Role created successfully',
  })
  createRole(
    @Body() requestData: CreateRoleRequestDto,
  ): Promise<IBaseResponse<void>> {
    return this.roleServive.createRole(requestData);
  }

  @Put('/:id')
  @ApiParam({ name: 'id', required: true, description: 'Room id' })
  @ApiOkResponse({
    description: 'Room updated successfully',
  })
  updateRoom(
    @Param() params: { id: string },
    @Body() requestData: UpdateRoleRequestDto,
  ): Promise<IBaseResponse<void>> {
    return this.roleServive.updateRole(params.id, requestData);
  }

  // @Delete('/:id')
  // @ApiParam({ name: 'id', required: true, description: 'Room id' })
  // @ApiOkResponse({
  //   description: 'Room deleted successfully',
  // })
  // deleteRoom(@Param() params: { id: string }) {
  //   return null;
  //   // return this.roomServive.deleteRoom(params.id);
  // }
}
