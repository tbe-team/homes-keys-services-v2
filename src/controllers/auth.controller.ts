import { Public } from '@/decorators';
import { LoginRequestDto, RegisterRequestDto } from '@/dto/request';
import { AuthService } from '@/services';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth API')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: LoginRequestDto) {
    return this.authService.signIn(signInDto.phonumber, signInDto.password);
  }

  @Post('register')
  @HttpCode(HttpStatus.OK)
  register(@Body() registerDto: RegisterRequestDto) {
    return this.authService.register(registerDto);
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
