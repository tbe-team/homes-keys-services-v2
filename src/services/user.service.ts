import { CreateUserRequestDto, PageOptionsRequestDto } from '@/dto/request';
import { PageDto, PageMetaDto, UserResponseDto } from '@/dto/response';
import { User } from '@/entities';
import { IBaseResponse, IUserService } from '@/interfaces';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { BadRequestException, HttpStatus, Injectable } from '@nestjs/common';
import { Logger } from '@nestjs/common/services';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService implements IUserService {
  private logger: Logger;

  constructor(
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {
    this.logger = new Logger(UserService.name);
  }

  async createUser(
    requestData: CreateUserRequestDto,
  ): Promise<IBaseResponse<void>> {
    const user = await this.mapper.mapAsync(
      requestData,
      CreateUserRequestDto,
      User,
    );
    await this.UserRepository.save(user);
    return {
      error: false,
      message: `User ${user.id} created successfully`,
      statusCode: HttpStatus.CREATED,
    };
  }

  async getAllUsers(
    queries: PageOptionsRequestDto,
  ): Promise<IBaseResponse<PageDto<UserResponseDto>>> {
    try {
      const queryBuilder = this.UserRepository.createQueryBuilder('user');
      queryBuilder
        .leftJoinAndSelect('user.role', 'role') // Inlcude role in the query
        .leftJoinAndSelect('user.motelRooms', 'motelRooms') // Include MotelRooms in the query
        .orderBy('user.createdAt', queries.orderBy)
        .skip(queries.skip)
        .take(queries.take);
      const itemCount = await queryBuilder.getCount();
      const { entities } = await queryBuilder.getRawAndEntities();
      console.log({ role: entities[0]?.role });
      const users = await this.mapper.mapArrayAsync(
        entities,
        User,
        UserResponseDto,
      );
      const pageMetaDto = new PageMetaDto({
        itemCount,
        pageOptions: queries,
      });

      return {
        error: false,
        message: 'Get all users successfully',
        statusCode: HttpStatus.OK,
        data: new PageDto(users, pageMetaDto),
      };
    } catch (ex) {
      this.logger.error(ex);
      throw new BadRequestException(ex);
    }
  }
}
