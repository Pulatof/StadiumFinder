import { ApiProperty } from "@nestjs/swagger"
import { IsDateString, IsNotEmpty, IsNumber } from "class-validator"

export class CreateCartDto {

    @ApiProperty({example:'1', description:'user  id raqami'})
    @IsNotEmpty()
    @IsNumber()
    user_id:number

    @ApiProperty({example:'1', description:'user wallet id raqami'})
    @IsNotEmpty()
    @IsNumber()
    user_wallet_id:number


    @ApiProperty({example:'1', description:'stadion vaqti'})
    @IsNotEmpty()
    @IsNumber()
    st_times_id:number

    @ApiProperty({example:'1', description:'Kun'})
    @IsDateString()
    date:Date

    @ApiProperty({example:'1', description:'Qachon qurilgani'})
    @IsDateString()
    createdAt: Date

    @ApiProperty({example:'1', description:'tozlash vaqti'})
    @IsDateString()
    time_for_clear:Date

    @ApiProperty({example:'1', description:'statusi'})
    @IsNotEmpty()
    @IsNumber()    
    status_id:number

}
