import { IsArray, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateUserDto {
  @ApiProperty({ description: 'Name User' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Username User' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ description: 'Email User' })
  @IsNotEmpty()
  @IsString()
  email: string;

  @ApiProperty({ description: 'Permissions User' })
  @IsNotEmpty()
  @IsArray()
  permissions: Array<string>;

  @ApiProperty({ description: 'Roles User' })
  @IsNotEmpty()
  @IsArray()
  roles: Array<string>;

  @ApiProperty({ description: 'Password User' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
