
import { ApiProperty } from '@nestjs/swagger';


export class LoginAdminDto {
    @ApiProperty({
      example: 'admin emaili',
      description: 'Admin elektron pochtasi',
    })
    email: string;
  
    @ApiProperty({ example: 'password', description: 'Foydalanuvchi paroli' })
    password: string;

  }