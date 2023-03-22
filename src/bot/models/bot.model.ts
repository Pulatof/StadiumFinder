import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, Model, Table } from "sequelize-typescript";
interface BotAttrs{
    user_id:number
    username:string
    firstname:string
    lastname:string
    phone_number:string
    status:boolean

}

@Table({tableName:'bot'})
export class Bot extends Model<Bot, BotAttrs>{

    @ApiProperty({example:'1', description:'name'})
    @Column({
        type:DataType.BIGINT,
      allowNull:false
    })
    user_id:number

    
    @ApiProperty({example:'nickname', description:'foydalanuvchi niki'})
    @Column({
        type:DataType.STRING,
    })
    username:string

    @ApiProperty({example:'Dilshod', description:'foydalanuvchi ismi'})

    @Column({
        type:DataType.STRING,
    })
    firstname:string


    @ApiProperty({example:'DIlshodov', description:'foydalanuvchi familiasi'})

    @Column({
        type:DataType.STRING,
    })
    lastname:string


    @ApiProperty({example:'+998999999999', description:'foydalanuvchi nomeri'})

    @Column({
        type:DataType.STRING,
    })
    phone:string

    @Column({
        type:DataType.BOOLEAN,
        defaultValue:false
    })
    status:boolean



}