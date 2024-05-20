import { CreateUserRequestDto } from '@/dto/request';
import { User } from '@/entities';
import { IBaseResponse, IUserService } from '@/interfaces';
import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

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
}
