import { Module } from '@nestjs/common';
import { UserService } from '@/services';
import { UserController } from '@/controllers';
import { User } from '@/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfile } from '@/profiles';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, UserProfile],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
