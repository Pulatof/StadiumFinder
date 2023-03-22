import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateCommentDto {
  @ApiProperty({ example: '1', description: 'Nimadir' })
  @IsNotEmpty()
  @IsNumber()
  user_id: number;

  @ApiProperty({ example: '1', description: 'Nimadir' })
  @IsNotEmpty()
  @IsNumber()
  stadium_id: number;

  @ApiProperty({ example: '', description: '' })
  @IsNotEmpty()
  @IsNumber()
  impression: number;
}
