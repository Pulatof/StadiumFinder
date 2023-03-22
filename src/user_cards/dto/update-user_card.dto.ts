import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsOptional, IsPhoneNumber, IsString } from 'class-validator';
import { CreateUserCardDto } from './create-user_card.dto';

export class UpdateUserCardDto {
    @ApiProperty({
        example: 'categoriya id',
        description: 'Stadionning turi categoriyasi',
      })
      @IsOptional()
      @IsNotEmpty()
      @IsNumber()
      user_id?: number;
    
      @ApiProperty({
        example: 'categoriya id',
        description: 'Stadionning turi categoriyasi',
      })
      @IsOptional()
      @IsNotEmpty()
      @IsString()
      name?: string;
    
      @ApiProperty({ example: '901234567', description: 'Foydalanuvchi telefoni' })
      @IsPhoneNumber()
      phone?: string;
    
      @ApiProperty({
        example: 'categoriya id',
        description: 'Stadionning joylashgan manzili',
      })
      @IsOptional()
      @IsNotEmpty()
      @IsString()
      number?: string;
    
      @ApiProperty({
        example: '01.01.2000',
        description: 'Foydalanuvchi tugilgan sanasii',
      })
      @IsOptional()
      @IsNotEmpty()
      @IsNumber()
      year?: number;
    
      @ApiProperty({
        example: '01.01.2000',
        description: 'Foydalanuvchi tugilgan sanasii',
      })
      @IsOptional()
      @IsNotEmpty()
      @IsNumber()
      month?: number;
}
