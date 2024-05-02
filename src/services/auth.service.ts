import { IAuthService } from '@/interfaces';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    phonenumber: string,
    pass: string,
  ): Promise<{ accessToken: string }> {
    const user = await this.userService.findOne(phonenumber);
    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.email };
    return {
      accessToken: await this.jwtService.signAsync(payload),
    };
  }
}
