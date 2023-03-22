import { ApiProduces, ApiProperty } from "@nestjs/swagger"
import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript"

interface OtpAttrs{
    id:string
    otp:string
    expiration_time:Date   // 3minut qop qoyardik
    verified:boolean
    check:string  //phoen number beriladi
}



@Table({tableName:'otp'})
export class Otp extends Model<Otp, OtpAttrs>{
    @ApiProperty({example:'1c321-z4x5c-z65c6', description:'OTP ID'})
    @Column({
        type:DataType.UUID,
        primaryKey:true,
        allowNull:false
    })
    id:string


    @ApiProperty({example:'1978', description:'OTP'})
    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    otp:string

    @ApiProperty({example:'1978-02-17T08', description:'expiration'})
    @Column({
        type:DataType.DATE,
        allowNull:false
    })
    expiration_time:Date

    @ApiProperty({example:'false', description:'verified'})
    @Column({
        type:DataType.BOOLEAN,
        defaultValue:false
    })
    verify:boolean

    @ApiProperty({example:'9989999999999', description:'chek phone number'})
    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    check:string


}

