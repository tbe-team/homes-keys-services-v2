import { Module } from '@nestjs/common';
import { AuthController } from '@/controllers';
import { AuthService } from '@/services';
import { UserModule } from './user.module';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '@/constants';
import { User } from '@/entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthProfile } from '@/profiles';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy, LocalStrategy } from '@/strategies';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from '@/guards';

@Module({
  controllers: [AuthController],
  providers: [
    LocalStrategy,
    AuthService,
    AuthProfile,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  exports: [AuthService],
  imports: [
    UserModule,
    TypeOrmModule.forFeature([User]),
    PassportModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
})
export class AuthModule {}
