import { ApiProperty } from "@nestjs/swagger"
import {  } from "sequelize"
import { Table, Model, Column, DataType, ForeignKey } from "sequelize-typescript"

interface UserAttrs{
    first_name:string
    last_name:string
    username:string
    hashed_password:string
    email:string
    phone:string
    birthday:Date
    is_owner:boolean
    is_active:boolean
    hashed_refresh_token:string
}

    
@Table({tableName:'users'})
export class User extends Model<User, UserAttrs>{
    @ApiProperty({example:'1', description:'Unique ID'})
    @Column({
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    })
    id:number

    @ApiProperty({example:'user ismi', description:'Foydalanuvchi ismi & Firstname of user'})
    @Column({
        type:DataType.STRING
    })
    first_name:string

    @ApiProperty({example:'user familiasi', description:'Foydalanuvchi familiasi & Lastname of user'})
    @Column({
        type:DataType.STRING
    })
    last_name:string

    @ApiProperty({example:'user niki', description:'Foydalanuvchi nikneymi & Users nickname'})
    @Column({
        type:DataType.STRING,
        allowNull:false,
        unique:true
    })
    username:string

    @ApiProperty({example:'password', description:'Foydalanuvchi parolie'})
    @Column({
        type:DataType.STRING,
        allowNull:false,
    })
    hashed_password:string

    @ApiProperty({example:'email', description:'Foydalanuvchi e-pochtasi'})
    @Column({
        type:DataType.STRING,
        allowNull:false,
        unique:true
    })
    email:string

    @ApiProperty({example:'901234567', description:'Foydalanuvchi telefoni'})
    @Column({
        type:DataType.STRING,
        // allowNull:false,
    })
    phone:string

    @ApiProperty({example:'01.01.2000', description:'Foydalanuvchi tugilgan sanasii'})
    @Column({
        type:DataType.DATE,
    })
    birthday:Date

    @ApiProperty({example:'false', description:'Maydon egasi bor yoqligi'})
    @Column({
        type:DataType.BOOLEAN,
        defaultValue:false
    })
    is_owner:boolean

    @ApiProperty({example:'false', description:'Foydalanuvchi tasdiqlangan holati'})
    @Column({
        type:DataType.BOOLEAN,
        defaultValue:false
    })
    is_active:boolean

    @ApiProperty({example:'token', description:'Tasdiqlangan holati'})
    @Column({
        type:DataType.STRING,
        defaultValue:false
    })
    hashed_refresh_token:string

    @Column({
        type:DataType.STRING,
    })
    activation_link:string

    
}
