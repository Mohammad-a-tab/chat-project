import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User } from '../entities/user.entity';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserWithUsernameDto } from './dto/get-user-with-username.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  findAll() {
    return this.userModel.find();
  }

  findOne(getUserWithUsername: GetUserWithUsernameDto) {
    return this.userModel.find({
      username: getUserWithUsername.username,
    });
  }

  async findByUsername(username: string) {
    const user = await this.userModel.findOne({ username });
    if (!user) throw new NotFoundException('user not found');
    return user;
  }

  createUser(createUserDto: CreateUserDto) {
    createUserDto.password = bcrypt.hashSync(createUserDto.password, 10);
    return this.userModel.create(createUserDto);
  }
}
