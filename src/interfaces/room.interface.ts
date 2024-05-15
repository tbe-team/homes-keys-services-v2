import {
  CreateRoomRequestDto,
  PageOptionsRequestDto,
  UpdateRoomRequestDto,
} from '@/dto/request';
import { PageDto, RoomResponseDto } from '@/dto/response';
import { IBaseResponse } from './base.interface';

export interface IRoomService {
  createRoom(requestData: CreateRoomRequestDto): Promise<IBaseResponse<void>>;

  updateRoom(
    id: string,
    requestData: UpdateRoomRequestDto,
  ): Promise<IBaseResponse<void>>;

  deleteRoom(id: string): Promise<IBaseResponse<void>>;

  getAllRooms(
    queries: PageOptionsRequestDto,
  ): Promise<IBaseResponse<PageDto<RoomResponseDto>>>;

  getRoomById(id: string): Promise<IBaseResponse<RoomResponseDto>>;
}
