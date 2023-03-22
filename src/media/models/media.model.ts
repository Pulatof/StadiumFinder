import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"

interface MediaAttrs{
    table_name:string
    table_id:number
    photo:string
    description:string

}


@Table({tableName:'media'})
export class Media extends Model <Media, MediaAttrs>{
    @Column({
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true
    })
    id:number


    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    table_name:string


    @ForeignKey(()=>Media)
    @Column({
        type:DataType.INTEGER,
        allowNull:false

    })
    table_id:number
    
    @Column({
        type:DataType.STRING,
        allowNull:false,
    })
    photo:string

    @Column({
        type:DataType.STRING,
        allowNull:false
    })
    description:string
}