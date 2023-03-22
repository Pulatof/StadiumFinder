import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';



export class UpdatePaymentForWalletDto {
  @ApiProperty({ example: '1', description: 'Nimadir' })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  user_id?: number;

  @ApiProperty({ example: '1', description: 'Nimadir' })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  card_id?: number;

  @ApiProperty({ example: '', description: '' })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  amount?: number;
}
