import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';
import { CreateStadiumTimeDto } from './create-stadium_time.dto';

export class UpdateStadiumTimeDto {
    @ApiProperty({
        example: 'categoriya id',
        description: 'Stadionning turi categoriyasi',
      })
      @IsOptional()
      @IsNotEmpty()
      @IsNumber()
      stadium_id?: number;
    
      @ApiProperty({
        example: 'categoriya id',
        description: 'Ish vaqti boshlanishi',
      })
      @IsOptional()
      @IsNotEmpty()
      @IsString()
      start_time?: string;
    
      @ApiProperty({
        example: 'categoriya id',
        description: 'Ish vaqti boshlanishi',
      })
      @IsOptional()
      @IsNotEmpty()
      @IsString()
      end_time?: string;
    
      @ApiProperty({
        example: 'categoriya id',
        description: 'Stadionning joylashgan manzili',
      })
      @IsOptional()
      @IsNotEmpty()
      @IsString()
      price?: string;
}