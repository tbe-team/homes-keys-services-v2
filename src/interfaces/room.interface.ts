import { CreateRoomRequestDto } from '@/dto/request';
import { IBaseResponse } from './base.interface';

export interface IRoomService {
  createRoom(requestData: CreateRoomRequestDto): Promise<IBaseResponse<void>>;
}
