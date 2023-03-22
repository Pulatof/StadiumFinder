import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateDistrictDto {
  @ApiProperty({
    example: 'user ismi',
    description: 'Foydalanuvchi ismi & Firstname of user',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name?: string;

  @ApiProperty({
    example: 'categoriya id',
    description: 'Stadionning turi categoriyasi',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  region_id?: number;
}
