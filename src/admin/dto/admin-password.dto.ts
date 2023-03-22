import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,

} from 'class-validator';


export class PasswordAdminDto {
  @ApiProperty({ example: 'password', description: 'Foydalanuvchi paroli' })
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({
    example: 'password',
    description: 'Foydalanuvchi yangi paroli',
  })
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  new_password: string;

  @ApiProperty({
    example: 'confirm_password',
    description: 'Foydalanuvchi parolini qayta tekshirish',
  })
  @IsNotEmpty()
  @IsString()
  confirm_password: string;
}
