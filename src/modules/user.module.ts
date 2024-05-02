import { Module } from '@nestjs/common';
import { UserService } from '@/services';
import { UserController } from '@/controllers';
import { User } from '@/entities';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
