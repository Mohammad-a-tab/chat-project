import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class GetUserWithUsernameDto {
  @ApiProperty({ description: 'Username User' })
  @IsNotEmpty()
  @IsString()
  username: string;
}
