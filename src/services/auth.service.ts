import { RegisterRequestDto } from '@/dto/request';
import { LoginResponseDto } from '@/dto/response';
import { User } from '@/entities';
import { IAuthService, IBaseResponse } from '@/interfaces';
import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import * as bcrypt from 'bcrypt';
import { bcryptConstants } from '@/constants';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,
    @InjectMapper()
    private readonly mapper: Mapper,
  ) {}

  async signIn(
    phonenumber: string,
    pass: string,
  ): Promise<IBaseResponse<LoginResponseDto>> {
    const user = await this.UserRepository.findOne({ where: { phonenumber } });
    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.email };
    const accessToken = await this.jwtService.signAsync(payload);

    return {
      message: 'Login successfully',
      statusCode: HttpStatus.OK,
      data: new LoginResponseDto(accessToken),
      error: false,
    };
  }

  async register(
    registerDto: RegisterRequestDto,
  ): Promise<IBaseResponse<void>> {
    const user = await this.mapper.mapAsync(
      registerDto,
      RegisterRequestDto,
      User,
    );
    const passwordEncoded = bcrypt.hashSync(
      registerDto.password,
      bcryptConstants.saltOrRounds,
    );
    user.password = passwordEncoded;
    this.UserRepository.save(user);
    return {
      error: false,
      message: `Account ${registerDto.phonenumber} created successfully`,
      statusCode: HttpStatus.CREATED,
    };
    // return this.userService.createUser();
  }
}
