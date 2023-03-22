import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { Comfort } from "src/comfort/models/comfort.model"
import { Stadium } from "src/stadiums/models/stadium.model"

interface ComfortStadiumAttrs{
    stadium_id:number
    comfort_id:number
}

@Table({tableName:'comfor_stadium'})
export class ComfortStadium extends Model<ComfortStadium, ComfortStadiumAttrs>{
    @Column({
        type:DataType.INTEGER,
        autoIncrement:true,
        primaryKey:true
    })
    id:number


    @ForeignKey(()=>Stadium)
    @Column({
        type:DataType.INTEGER,
        allowNull:false
    })
    staium_id:number



    @ForeignKey(()=>Comfort)
    @Column({
        type:DataType.INTEGER,
        allowNull:false
    })
    comfort_id:number
}
