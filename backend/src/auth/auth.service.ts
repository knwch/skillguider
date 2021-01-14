import { Injectable, UnauthorizedException, HttpStatus } from '@nestjs/common';
import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { User, UserDocument } from './schema/user.schema';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { validate } from 'class-validator';
import * as bcrypt from 'bcrypt';
import { JwtPayload } from './jwt/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User')
    private readonly UserModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<User> {
    // check uniqueness of email
    const { username, password } = authCredentialsDto;

    const user = await this.UserModel.findOne({ username });

    if (user) {
      const errors = { email: 'Email must be unique.' };
      throw new HttpException(
        { message: 'Input data validation failed', errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    // create new user
    const newUser = new this.UserModel();
    newUser.username = username;
    newUser.salt = await bcrypt.genSalt();
    newUser.password = await this.hashPassword(password, newUser.salt);

    const errors = await validate(newUser);
    if (errors.length > 0) {
      const _errors = { username: 'User input is not valid.' };
      throw new HttpException(
        { message: 'Input data validation failed', _errors },
        HttpStatus.BAD_REQUEST,
      );
    } else {
      return newUser.save();
    }
  }

  async signIn(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<{ accessToken: string }> {
    const { username, password } = authCredentialsDto;
    const user = await this.UserModel.findOne({ username });

    // validate between incoming password and actual password
    if (
      user &&
      (await this.validatePassword(password, user.password, user.salt))
    ) {
      const payload: JwtPayload = { username };
      const accessToken = await this.jwtService.sign(payload);
      return {
        ...payload,
        accessToken,
      };
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async validatePassword(
    password: string,
    userPassword: string,
    userSalt: string,
  ): Promise<boolean> {
    const hash = await bcrypt.hash(password, userSalt);
    return hash === userPassword;
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
