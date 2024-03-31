import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { UserSchema } from '../schemas/user.schema';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [AuthController],
  providers: [UserService, AuthService, JwtService],
})
export class AuthModule {}
