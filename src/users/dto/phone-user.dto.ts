import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsPhoneNumber,
  Matches,

} from 'class-validator';

export class PhoneUserDto {

  


  @ApiProperty({ example: '998991234567', description: 'Foydalanuvchi telefon raqamii' })
  @IsNotEmpty()
  @IsPhoneNumber()
  phone: string;

  


  
}
