// auth.service.ts
import { Injectable } from '@nestjs/common';
import { UserService } from './user.service';
import { SignInDto } from '../dto/signin.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<string> {
    const user = await this.userService.findByEmailAndPassword(
      signInDto.email,
      signInDto.password,
    );
    if (!user) {
      throw new Error('Invalid email or password');
    }

    const payload = { email: user.email, sub: user.id };
    return this.jwtService.sign(payload, {
      secret: 'jwt_secret_easygenerator',
      expiresIn: '60s',
    });
  }
}
