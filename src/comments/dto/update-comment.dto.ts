import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';
import { CreateCommentDto } from './create-comment.dto';

export class UpdateCommentDto {
    @ApiProperty({ example: '1', description: 'Nimadir' })
    @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  user_id?: number;

  @ApiProperty({ example: '1', description: 'Nimadir' })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  stadium_id?: number;

  @ApiProperty({ example: '', description: '' })
  @IsOptional()
  @IsNotEmpty()
  @IsNumber()
  impression?: number;
}
