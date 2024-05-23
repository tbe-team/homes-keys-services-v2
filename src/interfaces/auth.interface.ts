import { RegisterRequestDto } from '@/dto/request';
import { LoginResponseDto } from '@/dto/response';
import { IBaseResponse } from '@/interfaces';

export interface IAuthService {
  register(registerDto: RegisterRequestDto): Promise<IBaseResponse<void>>;

  validateUser(username: string, pass: string): Promise<any>;

  login(user: any): Promise<IBaseResponse<LoginResponseDto>>;
}
