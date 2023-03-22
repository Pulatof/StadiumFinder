import { ApiProperty } from "@nestjs/swagger"
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { User } from "src/users/models/user.model"

interface UserWallet_Attrs{
    user_id:number
    wallet:string
}



@Table({tableName:'user_wallet'})
export class UserWallet extends Model<UserWallet, UserWallet_Attrs> {
    @ApiProperty({example:'1', description:'Unique ID'})
    @Column({
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true
    })
    id:number

    @ApiProperty({example:'1', description:'Nimadir'})
    @ForeignKey(()=>User)
    @Column({
        type:DataType.INTEGER,
        allowNull:false
    })
    user_id:number

    @ApiProperty({example:'1', description:'ismi'})
    @Column({
        type:DataType.STRING
    })
    wallet:string
}
