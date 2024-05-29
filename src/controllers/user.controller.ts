import { ApiPaginatedResponse } from '@/decorators';
import { PageOptionsRequestDto } from '@/dto/request';
import { PageDto, UserResponseDto } from '@/dto/response';
import { IBaseResponse } from '@/interfaces';
import { UserService } from '@/services';
import { Controller, Get } from '@nestjs/common';
import { HttpCode, Query } from '@nestjs/common/decorators';
import { HttpStatus } from '@nestjs/common/enums';
import { ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('Users API')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiPaginatedResponse(UserResponseDto)
  async getAllUsers(
    @Query() pageOptionsRequest: PageOptionsRequestDto,
  ): Promise<IBaseResponse<PageDto<UserResponseDto>>> {
    return this.userService.getAllUsers(pageOptionsRequest);
  }
}
