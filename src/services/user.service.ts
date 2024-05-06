import { User } from '@/entities';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,
  ) {}

  async findOne(phonenumber: string): Promise<User | undefined> {
    return this.UserRepository.findOne({ where: { phonenumber } });
  }
}
