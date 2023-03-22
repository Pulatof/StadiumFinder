
import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';


export class UpdateCartDto {
  @ApiProperty({ example: '1', description: 'user  id raqami' })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  user_id?: number;

  @ApiProperty({ example: '1', description: 'user wallet id raqami' })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  user_wallet_id?: number;

  @ApiProperty({ example: '1', description: 'stadion vaqti' })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  st_times_id?: number;

  @ApiProperty({ example: '1', description: 'Kun' })
  @IsOptional()
  @IsDateString()
  date?: Date;

  @ApiProperty({ example: '1', description: 'Qachon qurilgani' })
  @IsOptional()
  @IsDateString()
  createdAt?: Date;

  @ApiProperty({ example: '1', description: 'tozlash vaqti' })
  @IsOptional()
  @IsDateString()
  time_for_clear?: Date;

  @ApiProperty({ example: '1', description: 'statusi' })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  status_id?: number;
}
