import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsEmail,

} from 'class-validator';

export class LoginUserDto {

  @ApiProperty({ example: 'email', description: 'Foydalanuvchi e-pochtasi' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'password', description: 'Foydalanuvchi paroli' })
  @IsNotEmpty()
  @IsString()
  password: string;


  
}
