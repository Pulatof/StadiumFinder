import { ApiProperty } from "@nestjs/swagger"
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"

interface CategoryAttrs{
    name:string
    parent_id:number
}


@Table({tableName:'categories'})
export class Category extends Model<Category, CategoryAttrs> {
    @ApiProperty({example:'1', description:'Unique ID'})
    @Column({
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true,
    })
    id:number

    @ApiProperty({example:'Categoriya nomi', description:'Categoriya nomi'})
    @Column({
        type:DataType.STRING,
        allowNull:false,
        unique:true
    })
    name:string

    @ApiProperty({example:'3', description:'Unique ID'})
    @ForeignKey(()=>Category)
    @Column({
        type:DataType.INTEGER,
    })
    parent_id:number

}
