import { Module } from '@nestjs/common';
import { AuthController } from '@/controllers';
import { AuthService } from '@/services';
import { UserModule } from './user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '@/constants';
import { User } from '@/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthProfile } from '@/profiles';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@/guards';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthProfile,
    { provide: APP_GUARD, useClass: AuthGuard },
  ],
  exports: [AuthService],
  imports: [
    UserModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
})
export class AuthModule {}
