import {
  Controller,
  Post,
  Body,
  UsePipes,
  Res,
  HttpStatus,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  async signup(@Res() res, @Body() authData: AuthCredentialsDto) {
    const userData = await this.authService.signUp(authData);
    return res.status(HttpStatus.OK).json({
      message: 'You have signed up successfully',
    });
  }

  @Post('signin')
  @UsePipes(ValidationPipe)
  async signin(@Res() res, @Body() authData: AuthCredentialsDto) {
    const userData = await this.authService.signIn(authData);
    return res.status(HttpStatus.OK).json({
      message: 'You have signed in successfully.',
      userData,
    });
  }
}
