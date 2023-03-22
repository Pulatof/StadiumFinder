import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MinLength,
  IsEmail,
  IsPhoneNumber,
  IsDateString,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    example: 'user ismi',
    description: 'Foydalanuvchi ismi & Firstname of user',
  })
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty({
    example: 'user familiasi',
    description: 'Foydalanuvchi familiasi & Lastname of user',
  })
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty({
    example: 'user niki',
    description: 'Foydalanuvchi nikneymi & Users nickname',
  })
  @IsNotEmpty()
  @IsString()
  username: string;

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

  @ApiProperty({ example: 'email', description: 'Foydalanuvchi e-pochtasi' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: '901234567', description: 'Foydalanuvchi telefoni' })
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({
    example: '01.01.2000',
    description: 'Foydalanuvchi tugilgan sanasii',
  })
  @IsNotEmpty()
  @IsDateString()
  birthday: Date;

  
}
