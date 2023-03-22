import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsPhoneNumber, IsString } from 'class-validator';

export class CreateUserCardDto {
  @ApiProperty({
    example: 'categoriya id',
    description: 'Stadionning turi categoriyasi',
  })
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @ApiProperty({
    example: 'categoriya id',
    description: 'Stadionning turi categoriyasi',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ example: '901234567', description: 'Foydalanuvchi telefoni' })
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({
    example: 'categoriya id',
    description: 'Stadionning joylashgan manzili',
  })
  @IsNotEmpty()
  @IsString()
  number: string;

  @ApiProperty({
    example: '01.01.2000',
    description: 'Foydalanuvchi tugilgan sanasii',
  })
  @IsNotEmpty()
  @IsNumber()
  year: number;

  @ApiProperty({
    example: '01.01.2000',
    description: 'Foydalanuvchi tugilgan sanasii',
  })
  @IsNotEmpty()
  @IsNumber()
  month: number;

}
