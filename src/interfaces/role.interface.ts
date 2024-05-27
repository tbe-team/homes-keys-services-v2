import {
  CreateRoleRequestDto,
  PageOptionsRequestDto,
  UpdateRoleRequestDto,
} from '@/dto/request';
import { PageDto, RoleResponseDto } from '@/dto/response';
import { IBaseResponse } from '@/interfaces';

export interface IRoleService {
  getAllRoles({
    queries,
  }: {
    queries: PageOptionsRequestDto;
  }): Promise<IBaseResponse<PageDto<RoleResponseDto>>>;

  createRole(requestData: CreateRoleRequestDto): Promise<IBaseResponse<void>>;

  updateRole(
    id: string,
    requestData: UpdateRoleRequestDto,
  ): Promise<IBaseResponse<void>>;
}
