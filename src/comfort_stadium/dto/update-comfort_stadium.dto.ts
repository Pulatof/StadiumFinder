
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsOptional } from 'class-validator';


export class UpdateComfortStadiumDto {
    @ApiProperty({
        example: 'categoriya id',
        description: 'Stadionning turi categoriyasi',
      })
      @IsOptional()
      @IsNotEmpty()
      @IsNumber()
      staium_id?: number;
    
      @ApiProperty({
        example: 'categoriya id',
        description: 'Stadionning turi categoriyasi',
      })
      @IsNotEmpty()
      @IsNumber()
      comfort_id?: number;
}
