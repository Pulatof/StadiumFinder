import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateStadiumDto {
  @ApiProperty({
    example: 'categoriya id',
    description: 'Stadionning turi categoriyasi',
  })
  @IsNotEmpty()
  @IsNumber()
  category_id: number;

  @ApiProperty({
    example: 'categoriya id',
    description: 'Stadionning turi categoriyasi',
  })
  @IsNotEmpty()
  @IsNumber()
  owner_id: number;

  @ApiProperty({
    example: 'categoriya id',
    description: 'Stadionning turi categoriyasi',
  })
  @IsNotEmpty()
  @IsString()
  contact_with: string;

  @ApiProperty({
    example: 'categoriya id',
    description: 'Stadionning turi categoriyasi',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    example: 'categoriya id',
    description: 'Stadionning turi categoriyasi',
  })
  @IsNotEmpty()
  @IsString()
  volume: string;

  @ApiProperty({
    example: 'categoriya id',
    description: 'Stadionning joylashgan manzili',
  })
  @IsNotEmpty()
  @IsString()
  adress: string;

  @ApiProperty({
    example: 'categoriya id',
    description: 'stadion joylashgan viloyatning id si',
  })
  @IsNotEmpty()
  @IsNumber()
  region_id: number;

  @ApiProperty({
    example: 'categoriya id',
    description: 'stadion joylashgan shaharning id si',
  })
  @IsNotEmpty()
  @IsNumber()
  city_id: number;

  @ApiProperty({
    example: 'categoriya id',
    description: 'stadion joylashgan tumanning id si',
  })
  @IsNotEmpty()
  @IsNumber()
  district_id: number;

  @ApiProperty({
    example: 'categoriya id',
    description: 'Stadionning joylashgan lokatsiyasi',
  })
  @IsNotEmpty()
  @IsString()
  location: string;

  // @ApiProperty({
  //   example: 'categoriya id',
  //   description: ' Qurilgan vaqti ',
  // })
  // // @IsNotEmpty()
  // @IsDateString()
  // buildAt: Date;

  @ApiProperty({
    example: 'categoriya id',
    description: 'Ish vaqti boshlanishi',
  })
  @IsNotEmpty()
  @IsString()
  start_time: string;

  @ApiProperty({
    example: 'categoriya id',
    description: 'Ish vaqti tugashi',
  })
  @IsNotEmpty()
  @IsString()
  end_time: string;
}
