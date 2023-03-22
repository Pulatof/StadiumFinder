import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { CreateRegionDto } from './create-region.dto';

export class UpdateRegionDto{
    @ApiProperty({
        example: 'categoriya id',
        description: 'Stadionning turi categoriyasi',
      })
      @IsOptional()
      @IsNotEmpty()
      @IsString()
      name?: string;
}
