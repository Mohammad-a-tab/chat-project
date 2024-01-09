import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiParam,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserWithUsernameDto } from './dto/get-user-with-username.dto';
import { AuthGuard } from '../auth/auth.guard';
import { Roles } from '../roles/roles.decorator';
import { Permissions } from '../permissions/permissions.decorator';
import { Role } from '../enums/role.enum';
import { Permission } from '../enums/permission.enum';

@ApiTags('Users')
@ApiBearerAuth()
@ApiSecurity('bearerAuth')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @Permissions(Permission.Read)
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @Permissions(Permission.Read)
  @Get(':username')
  @ApiParam({ name: 'username', description: 'get user' })
  findOne(@Param() getUserWithUsername: GetUserWithUsernameDto) {
    return this.userService.findOne(getUserWithUsername);
  }

  @UseGuards(AuthGuard)
  @Roles(Role.Admin)
  @Permissions(Permission.Create)
  @Post('create')
  @ApiBody({
    type: CreateUserDto,
    description: 'Data to create a new user',
  })
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
}
