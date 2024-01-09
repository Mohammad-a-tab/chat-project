import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from './dto/login-user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(loginUserDto: LoginUserDto) {
    const user = await this.userService.findByUsername(loginUserDto.username);
    if (!bcrypt.compareSync(loginUserDto.password, user.password)) {
      throw new UnauthorizedException();
    }
    const payload = {
      sub: user.id,
      username: user.username,
      roles: user.roles,
      permissions: user.permissions,
    };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
