import { ApiProperty } from "@nestjs/swagger"
import {  } from "sequelize"
import { Column, DataType, ForeignKey, Table, Model } from "sequelize-typescript"
import { Col } from "sequelize/types/utils"
import { User } from "src/users/models/user.model"

interface User_cardsAttrs{
    user_id:number
    name:string
    phone:string
    number:string
    year:number
    month:number
    is_active:boolean
    is_man:boolean
}




@Table({tableName:'user_cards'})
export class User_card extends Model<User_card, User_cardsAttrs>{
    @ApiProperty({example:'1', description:'Unique ID'})
    @Column({
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    })
    id:number

    @ApiProperty({example:'2', description:'Unique ID'})
    @ForeignKey(()=>User)
    @Column({
    type:DataType.INTEGER,
    allowNull:false
    })
    user_id:number


    @ApiProperty({example:'1', description:'ismi'})
    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    name:string

    @ApiProperty({example:'1', description:'ismi'})
    @Column({
        type:DataType.STRING
    })
    phone:string

    @ApiProperty({example:'1', description:'ismi'})
    @Column({
        type:DataType.STRING
    })
    number:string

    @ApiProperty({example:'1', description:'ismi'})
    @Column({
        type:DataType.INTEGER
    })
    year:number

    @ApiProperty({example:'1', description:'ismi'})
    @Column({
        type:DataType.INTEGER
    })
    month:number

    @ApiProperty({example:'false', description:'Foydalanuvchi tasdiqlangan holati'})
    @Column({
        type:DataType.BOOLEAN,
        defaultValue:false
    })
    is_active:boolean

    @ApiProperty({example:'false', description:'Foydalanuvchi asosiymi'})
    @Column({
        type:DataType.BOOLEAN,
        defaultValue:false
    })
    is_main:boolean
}
