import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMediaDto {
  @ApiProperty({
    example: 'categoriya id',
    description: 'Stadionning turi categoriyasi',
  })
  @IsNotEmpty()
  @IsString()
  table_name: string;

  @ApiProperty({ example: '1', description: 'Nimadir' })
  @IsNotEmpty()
  @IsNumber()
  table_id: number;

  @ApiProperty({
    example: 'categoriya id',
    description: 'Stadionning turi categoriyasi',
  })
  @IsNotEmpty()
  @IsString()
  photo: string;

  @ApiProperty({
    example: 'categoriya id',
    description: 'Stadionning turi categoriyasi',
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}
