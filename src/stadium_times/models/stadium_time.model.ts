import { ApiProperty } from '@nestjs/swagger';
import {} from 'sequelize';
import {
  Column,
  DataType,
  ForeignKey,
  Table,
  Model,
} from 'sequelize-typescript';
import { Stadium } from 'src/stadiums/models/stadium.model';

interface StadiumTimeAttrs {
  stadium_id: number;
  start_time: string;
  end_time: string;
  price: string;
}

@Table({ tableName: 'stadium_times' })
export class StadiumTime extends Model<StadiumTime, StadiumTimeAttrs> {
  @ApiProperty({ example: '1', description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '1', description: 'Nimadir' })
  @ForeignKey(() => Stadium)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  stadium_id: number;

  @ApiProperty({ example: '', description: '' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  start_time: string;

  @ApiProperty({ example: '', description: '' })
  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  end_time: string;

  @ApiProperty({ example: '1', description: 'ismi' })
  @Column({
    type: DataType.STRING,
  })
  price: string;
}
