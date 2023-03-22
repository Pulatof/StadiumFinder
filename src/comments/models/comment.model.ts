import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { Stadium } from "src/stadiums/models/stadium.model";
import { User } from "src/users/models/user.model";

interface CommentAttrs{
    user_id:number
    stadium_id:number
    impression:number
}

@Table({tableName:'comment'})
export class Comment extends Model<Comment, CommentAttrs>{
    @ApiProperty({ example: '1', description: 'Nimadir' })
    @Column({
        type: DataType.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      })
      id: number;

      @ApiProperty({ example: '1', description: 'Nimadir' })
      @ForeignKey(() => User)
      @Column({
        type: DataType.INTEGER,
        allowNull: false,
      })
      user_id: number;

      @ApiProperty({ example: '1', description: 'Nimadir' })
      @ForeignKey(() => Stadium)
      @Column({
        type: DataType.INTEGER,
        allowNull: false,
      })
      stadium_id: number;

      @ApiProperty({ example: '', description: '' })
      @Column({
        type: DataType.INTEGER,
        allowNull: false,
      })
     impression: number;
}
