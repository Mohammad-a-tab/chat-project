import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class LoginUserDto {
  @ApiProperty({ description: 'Username User' })
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty({ description: 'Password User' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
