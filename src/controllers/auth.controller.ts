import { Public } from '@/decorators';
import { LoginRequestDto, RegisterRequestDto } from '@/dto/request';
import { LocalAuthGuard } from '@/guards';
import { AuthService } from '@/services';
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiExtraModels, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('Auth API')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  @HttpCode(HttpStatus.OK)
  register(@Body() registerDto: RegisterRequestDto) {
    return this.authService.register(registerDto);
  }

  @Get('/test')
  @HttpCode(HttpStatus.OK)
  getTest(@Request() req: any) {
    return 'hello';
  }

  @Post('login')
  @Public()
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthGuard)
  // @ApiExtraModels(LoginRequestDto)
  signInWitPassport(@Request() req: any) {
    return this.authService.login(req.user);
  }
}
