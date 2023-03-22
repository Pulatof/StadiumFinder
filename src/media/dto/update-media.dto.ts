import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateMediaDto {
  @ApiProperty({
    example: 'categoriya id',
    description: 'Stadionning turi categoriyasi',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  table_name?: string;

  @ApiProperty({ example: '1', description: 'Nimadir' })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  table_id?: number;

  @ApiProperty({
    example: 'categoriya id',
    description: 'Stadionning turi categoriyasi',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  photo?: string;

  @ApiProperty({
    example: 'categoriya id',
    description: 'Stadionning turi categoriyasi',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  description?: string;
}
