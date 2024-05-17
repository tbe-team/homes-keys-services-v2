import {
  CreateMotelRoomRequestDto,
  PageOptionsRequestDto,
  UpdateMotelRequestDto,
} from '@/dto/request';
import { MotelResponseDto, PageDto } from '@/dto/response';
import { IBaseResponse } from './base.interface';

export interface IMotelRoomService {
  createMotelRoom(
    request: CreateMotelRoomRequestDto,
  ): Promise<IBaseResponse<void>>;

  getAllMotels(
    queries: PageOptionsRequestDto,
  ): Promise<IBaseResponse<PageDto<MotelResponseDto>>>;

  getMotelById(id: string): Promise<IBaseResponse<MotelResponseDto>>;

  updateMotel(
    id: string,
    requestData: UpdateMotelRequestDto,
  ): Promise<IBaseResponse<void>>;

  deleteMotel(id: string): Promise<IBaseResponse<void>>;
}
