
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';


export class UpdateStadiumDto {
    @ApiProperty({
        example: 'categoriya id',
        description: 'Stadionning turi categoriyasi',
      })
      @IsOptional()
      @IsNotEmpty()
      @IsNumber()
      category_id?: number;


      @ApiProperty({
        example: 'categoriya id',
        description: 'Stadionning turi categoriyasi',
      })
      @IsOptional()
      @IsNotEmpty()
      @IsNumber()
      owner_id?: number;


      @ApiProperty({
        example: 'categoriya id',
        description: 'Stadionning turi categoriyasi',
      })
      @IsOptional()
      @IsNotEmpty()
      @IsString()
      contact_with?: string;

      @ApiProperty({
        example: 'categoriya id',
        description: 'Stadionning turi categoriyasi',
      })
      @IsOptional()
      @IsNotEmpty()
      @IsString()
      name?: string;

      @ApiProperty({
        example: 'categoriya id',
        description: 'Stadionning turi categoriyasi',
      })
      @IsOptional()
      @IsNotEmpty()
      @IsString()
      volume?: string;

      @ApiProperty({
        example: 'categoriya id',
        description: 'Stadionning joylashgan manzili',
      })
      @IsOptional()
      @IsNotEmpty()
      @IsString()
      adress?: string;

      @ApiProperty({
        example: 'categoriya id',
        description: 'stadion joylashgan viloyatning id si',
      })
      @IsOptional()
      @IsNotEmpty()
      @IsNumber()
      region_id?: number;

      @ApiProperty({
        example: 'categoriya id',
        description: 'stadion joylashgan shaharning id si',
      })
      @IsOptional()
      @IsNotEmpty()
      @IsNumber()
      city_id?: number;

      @ApiProperty({
        example: 'categoriya id',
        description: 'stadion joylashgan tumanning id si',
      })
      @IsOptional()
      @IsNotEmpty()
      @IsNumber()
      district_id?: number;

      @ApiProperty({
        example: 'categoriya id',
        description: 'Stadionning joylashgan lokatsiyasi',
      })
      @IsOptional()
      @IsNotEmpty()
      @IsString()
      location?: string;

      // @ApiProperty({
      //   example: 'categoriya id',
      //   description: ' Qurilgan vaqti ',
      // })
      // @IsNotEmpty()
      // @IsDateString()
      // buildAt?: Date;

      @ApiProperty({
        example: 'categoriya id',
        description: 'Ish vaqti boshlanishi',
      })
      @IsOptional()
      @IsNotEmpty()
      @IsString()
      start_time?: string;

      @ApiProperty({
        example: 'categoriya id',
        description: 'Ish vaqti tugashi',
      })
      @IsOptional()
      @IsNotEmpty()
      @IsString()
      end_time?: string;
}
