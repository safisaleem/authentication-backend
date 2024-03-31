import {
  Controller,
  Post,
  Body,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { SignUpDto } from '../dto/signup.dto';
import { SignInDto } from '../dto/signin.dto';

import { UserService } from './user.service';
import { AuthService } from './auth.service';

import { validate } from 'class-validator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post('signup')
  async signUp(@Body() signUpDto: SignUpDto) {
    // Validate sign-up data
    const errors = await validate(signUpDto);

    if (errors.length > 0) {
      throw new HttpException(
        { message: 'Validation failed', errors },
        HttpStatus.BAD_REQUEST,
      );
    }

    const existingUser = await this.userService.findByEmail(signUpDto.email);
    if (existingUser) {
      throw new HttpException(
        { message: 'User with this email already exists' },
        HttpStatus.BAD_REQUEST,
      );
    }

    const newUser = await this.userService.create(signUpDto);

    return newUser;
  }

  @Post('signin')
  async signIn(@Body() signInDto: SignInDto) {
    try {
      const token = await this.authService.signIn(signInDto);
      return { token };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.UNAUTHORIZED);
    }
  }
}
