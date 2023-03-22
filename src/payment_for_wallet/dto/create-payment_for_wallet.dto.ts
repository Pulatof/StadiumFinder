import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreatePaymentForWalletDto {
  @ApiProperty({ example: '1', description: 'Nimadir' })
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ example: '1', description: 'Nimadir' })
  card_id: number;

  @ApiProperty({ example: '', description: '' })
  @IsNotEmpty()
  @IsNumber()
  amount: number;
}
