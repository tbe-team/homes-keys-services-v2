import {
  CreateRoleRequestDto,
  PageOptionsRequestDto,
  UpdateRoleRequestDto,
} from '@/dto/request';
import {
  BadRequestException,
  HttpStatus,
  Injectable,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { IBaseResponse, IRoleService } from '@/interfaces';
import { PageDto, PageMetaDto, RoleResponseDto } from '@/dto/response';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from '@/entities';
import { Repository } from 'typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';

@Injectable()
export class RoleService implements IRoleService {
  private logger: Logger;
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {
    this.logger = new Logger(RoleService.name);
  }

  async getAllRoles({
    queries,
  }: {
    queries: PageOptionsRequestDto;
  }): Promise<IBaseResponse<PageDto<RoleResponseDto>>> {
    try {
      const queryBuilder = this.roleRepository.createQueryBuilder('role');
      queryBuilder
        .orderBy('role.createdAt', queries.orderBy)
        .skip(queries.skip)
        .take(queries.take);
      const itemCount = await queryBuilder.getCount();
      const { entities } = await queryBuilder.getRawAndEntities();
      const floors = await this.mapper.mapArrayAsync(
        entities,
        Role,
        RoleResponseDto,
      );
      const pageMetaDto = new PageMetaDto({
        itemCount,
        pageOptions: queries,
      });

      return {
        error: false,
        message: 'Get all roles successfully',
        statusCode: HttpStatus.OK,
        data: new PageDto(floors, pageMetaDto),
      };
    } catch (ex) {
      this.logger.error(ex);
      throw new BadRequestException(ex);
    }
  }

  async createRole(
    requestData: CreateRoleRequestDto,
  ): Promise<IBaseResponse<void>> {
    const role = await this.mapper.mapAsync(
      requestData,
      CreateRoleRequestDto,
      Role,
    );
    try {
      await this.roleRepository.save(role);
    } catch (e) {
      throw new BadRequestException(e);
    }

    return {
      error: false,
      message: `Role ${role.id} created successfully`,
      statusCode: HttpStatus.OK,
    };
  }

  async updateRole(
    id: string,
    requestData: UpdateRoleRequestDto,
  ): Promise<IBaseResponse<void>> {
    const role = await this.roleRepository.findOne({ where: { id } });
    if (!role) throw new NotFoundException(`Role ${id} could not be found`);

    role.roleName = requestData.roleName;
    role.description = requestData.description;

    await this.roleRepository.save(role);
    return {
      error: false,
      message: `Motel ${role.id} updated successfully`,
      statusCode: HttpStatus.OK,
    };
  }
}
