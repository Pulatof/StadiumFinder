import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  MinLength,
  IsEmail,
  IsPhoneNumber,
  IsDateString,
  IsOptional,
} from 'class-validator';

export class UpdateUserDto {
    @ApiProperty({
        example: 'user ismi',
        description: 'Foydalanuvchi ismi & Firstname of user',
      })
      @IsNotEmpty()
      @IsString()
      @IsOptional()
      first_name?: string;
    
      @ApiProperty({
        example: 'user familiasi',
        description: 'Foydalanuvchi familiasi & Lastname of user',
      })
      @IsNotEmpty()
      @IsString()
      @IsOptional()

      last_name?: string;
    
      @ApiProperty({
        example: 'user niki',
        description: 'Foydalanuvchi nikneymi & Users nickname',
      })
      @IsNotEmpty()
      @IsString()
      @IsOptional()

      username?: string;
    
      @ApiProperty({ example: 'email', description: 'Foydalanuvchi e-pochtasi' })
      @IsEmail()
      @IsOptional()

      email?: string;
    
      @ApiProperty({ example: '901234567', description: 'Foydalanuvchi telefoni' })
      @IsPhoneNumber()
      @IsOptional()
      phone?: string;
    
      @ApiProperty({
        example: '01.01.2000',
        description: 'Foydalanuvchi tugilgan sanasii',
      })
      @IsNotEmpty()
      @IsDateString()
      @IsOptional()
      birthday?: Date;

}
