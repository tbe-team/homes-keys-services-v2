import { RegisterRequestDto } from '@/dto/request';
import { LoginResponseDto } from '@/dto/response';
import { IBaseResponse } from '@/interfaces';

export interface IAuthService {
  signIn(
    phonenumber: string,
    pass: string,
  ): Promise<IBaseResponse<LoginResponseDto>>;

  register(registerDto: RegisterRequestDto): Promise<IBaseResponse<void>>;
}
