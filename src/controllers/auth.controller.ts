import { Public } from '@/decorators';
import { LoginRequestDto, RegisterRequestDto } from '@/dto/request';
import { LocalAuthGuard } from '@/guards';
import { AuthService } from '@/services';
import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth API')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.OK)
  register(@Body() registerDto: RegisterRequestDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  @Public()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  @ApiBody({ type: LoginRequestDto })
  signInWitPassport(@Request() req: any) {
    return this.authService.login(req.user);
  }
}
