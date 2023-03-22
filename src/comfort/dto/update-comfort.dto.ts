import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateComfortDto {
  @ApiProperty({
    example: 'categoriya id',
    description: 'Stadionning turi categoriyasi',
  })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  name?: string;
}
