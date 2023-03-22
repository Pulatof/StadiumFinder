import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { CreateAdminDto } from './create-admin.dto';

export class UpdateAdminDto {
    @ApiProperty({
      example: 'foydalanuvchi niki',
      description: 'Foydalanuvchi nikneymi',
    })
    @IsOptional()
    @IsNotEmpty()
    @IsString()
    user_name?: string;
  
    @ApiProperty({
      example: 'admin emaili',
      description: 'Admin elektron pochtasi',
    })
    @IsOptional()
    @IsEmail()
    email?: string;
  
    @ApiProperty({
      example: 'admin phone',
      description: 'adminning telefon raqami',
    })
    @IsOptional()
    @IsPhoneNumber()
    phone?: string;
  
    // @ApiProperty({ example: 'password', description: 'Foydalanuvchi paroli' })
    // @IsNotEmpty()
    // @IsString()
    // @MinLength(6)
    // @IsStrongPassword()
    // password?: string;
  
    // @ApiProperty({
    //   example: 'confirm_password',
    //   description: 'Foydalanuvchi parolini qayta tekshirish',
    // })
    // @IsNotEmpty()
    // @IsString()
    // @MinLength(6)
    // @IsStrongPassword()
    // confirm_password?: string;
  
  }