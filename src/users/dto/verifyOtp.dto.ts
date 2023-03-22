import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumberString,
  IsPhoneNumber,
  IsString,
  Matches,

} from 'class-validator';

export class VerifyOtpDto {

    @ApiProperty({ example: '998991234567', description: 'Foydalanuvchi telefon raqamii' })
    @IsNotEmpty()
    @IsPhoneNumber()
    check: string;


  @ApiProperty({ example: '998991234567', description: 'Foydalanuvchi telefon raqamii' })
  @IsNotEmpty()
  @IsString()
  verification_key: string;

  @ApiProperty({ example: '998991234567', description: 'Foydalanuvchi telefon raqamii' })
  @IsNumberString()
  otp: string;

  


  
}
