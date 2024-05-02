import { CreateMotelRoomRequestDto } from '@/dto/request';
import { IBaseResponse } from './base.interface';

export interface IMotelRoomService {
  createMotelRoom(
    request: CreateMotelRoomRequestDto,
  ): Promise<IBaseResponse<void>>;
}
