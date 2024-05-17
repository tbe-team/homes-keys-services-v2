import { CreateUserRequestDto } from '@/dto/request';
import { IBaseResponse } from './base.interface';

export interface IUserService {
  createUser(requestData: CreateUserRequestDto): Promise<IBaseResponse<void>>;
}
