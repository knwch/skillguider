import {
  Controller,
  Get,
  Post,
  Put,
  Body,
  UsePipes,
  Req,
  Res,
  Query,
  NotFoundException,
  HttpStatus,
  ValidationPipe,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async signup(@Body() authData: AuthCredentialsDto) {
    const token = await this.authService.signUp(authData);
    return token;
  }

  @Post('signin')
  async signin(@Body() authData: AuthCredentialsDto) {
    const token = await this.authService.signIn(authData);
    return token;
  }

  @Post('test')
  @UseGuards(AuthGuard())
  test(@Req() req) {
    console.log(req);
  }
}
