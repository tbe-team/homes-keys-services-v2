import { CreateFloorRequestDto, UpdateFloorRequestDto } from '@/dto/request';
import { FloorReponseDto } from '@/dto/response';
import { IBaseResponse } from './base.interface';

export interface IFloorService {
  getAllFloors(): Promise<IBaseResponse<FloorReponseDto[]>>;

  getFloorById(id: string): Promise<IBaseResponse<FloorReponseDto>>;

  createFloor(requestData: CreateFloorRequestDto): Promise<IBaseResponse<void>>;

  updateFloor(requestData: UpdateFloorRequestDto): Promise<IBaseResponse<void>>;

  deleteFloor(id: string): Promise<IBaseResponse<void>>;
}
