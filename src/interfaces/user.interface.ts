import { CreateUserRequestDto, PageOptionsRequestDto } from '@/dto/request';
import { PageDto, UserResponseDto } from '@/dto/response';
import { IBaseResponse } from './base.interface';

export interface IUserService {
  createUser(requestData: CreateUserRequestDto): Promise<IBaseResponse<void>>;

  getAllUsers(
    pageOptionsRequest: PageOptionsRequestDto,
  ): Promise<IBaseResponse<PageDto<UserResponseDto>>>;
}
