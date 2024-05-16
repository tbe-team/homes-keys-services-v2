import {
  CreateFloorRequestDto,
  PageOptionsRequest,
  UpdateFloorRequestDto,
} from '@/dto/request';
import { FloorReponseDto, PageDto } from '@/dto/response';
import { IBaseResponse } from './base.interface';

export interface IFloorService {
  getAllFloors(
    queries: PageOptionsRequest,
  ): Promise<IBaseResponse<PageDto<FloorReponseDto>>>;

  getFloorById(id: string): Promise<IBaseResponse<FloorReponseDto>>;

  createFloor(requestData: CreateFloorRequestDto): Promise<IBaseResponse<void>>;

  updateFloor(requestData: UpdateFloorRequestDto): Promise<IBaseResponse<void>>;

  deleteFloor(id: string): Promise<IBaseResponse<void>>;
}
