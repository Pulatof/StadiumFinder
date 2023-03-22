import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsPhoneNumber, IsString, IsStrongPassword, MinLength, IsEmail } from 'class-validator';


export class CreateAdminDto {
  @ApiProperty({
    example: 'foydalanuvchi niki',
    description: 'Foydalanuvchi nikneymi',
  })
  @IsNotEmpty()
  @IsString()
  user_name: string;

  @ApiProperty({
    example: 'admin emaili',
    description: 'Admin elektron pochtasi',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'admin phone',
    description: 'adminning telefon raqami',
  })
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({ example: 'password', description: 'Foydalanuvchi paroli' })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @IsStrongPassword()
  password: string;

  @ApiProperty({
    example: 'confirm_password',
    description: 'Foydalanuvchi parolini qayta tekshirish',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @IsStrongPassword()
  confirm_password: string;

}
