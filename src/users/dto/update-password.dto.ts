import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,

} from 'class-validator';

export class UpdatePasswordDto {

  @ApiProperty({ example: 'password', description: 'Foydalanuvchi eski paroli' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ example: 'password', description: 'Foydalanuvchi yangi paroli' })
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  new_password: string;

  @ApiProperty({ example: 'password', description: 'Foydalanuvchi yangi paroli' })
  @IsNotEmpty()
  @IsString()
  confirm_password: string;

  
}
