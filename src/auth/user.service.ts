import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../schemas/user.schema';
import { SignUpDto } from '..//dto/signup.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async create(signUpDto: SignUpDto): Promise<User> {
    const newUser = new this.userModel(signUpDto);
    return await newUser.save();
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userModel.findOne({ email }).exec();
  }

  async findByEmailAndPassword(
    email: string,
    password: string,
  ): Promise<User | null> {
    const user = await this.userModel.findOne({ email, password }).exec();
    return user;
  }
}
