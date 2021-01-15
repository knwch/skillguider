import {
  Controller,
  Post,
  Body,
  UsePipes,
  Res,
  HttpStatus,
  UseGuards,
  ValidationPipe,
  NotFoundException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';

import {
  ApiBearerAuth,
  ApiResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create admin account' })
  @ApiResponse({ status: 201, description: 'Account has been created.' })
  @ApiResponse({ status: 400, description: 'Input data validation failed.' })
  @Post('signup')
  @UseGuards(AuthGuard())
  @UsePipes(ValidationPipe)
  async signup(@Res() res, @Body() authData: AuthCredentialsDto) {
    await this.authService.signUp(authData);
    return res.status(HttpStatus.CREATED).json({
      message: 'You have signed up successfully',
      statusCode: HttpStatus.CREATED,
    });
  }

  @ApiOperation({ summary: 'Sign in admin account' })
  @ApiResponse({ status: 200, description: 'Signed in successfully.' })
  @ApiResponse({ status: 401, description: 'Invalid credentials.' })
  @Post('signin')
  @UsePipes(ValidationPipe)
  async signin(@Res() res, @Body() authData: AuthCredentialsDto) {
    const userData = await this.authService.signIn(authData);
    if (!userData) throw new NotFoundException('User does not exist!');
    return res.status(HttpStatus.OK).json({
      message: 'You have signed in successfully.',
      statusCode: HttpStatus.OK,
      userData,
    });
  }
}
