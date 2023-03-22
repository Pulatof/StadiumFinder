import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateStadiumTimeDto {
  @ApiProperty({
    example: 'categoriya id',
    description: 'Stadionning turi categoriyasi',
  })
  @IsNotEmpty()
  @IsNumber()
  stadium_id: number;

  @ApiProperty({
    example: 'categoriya id',
    description: 'Ish vaqti boshlanishi',
  })
  @IsNotEmpty()
  @IsString()
  start_time: string;

  @ApiProperty({
    example: 'categoriya id',
    description: 'Ish vaqti boshlanishi',
  })
  @IsNotEmpty()
  @IsString()
  end_time: string;

  @ApiProperty({
    example: 'categoriya id',
    description: 'Stadionning joylashgan manzili',
  })
  @IsNotEmpty()
  @IsString()
  price: string;

}
