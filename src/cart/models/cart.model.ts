import { ApiProperty } from '@nestjs/swagger';
import {
  AutoIncrement,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { StadiumTime } from 'src/stadium_times/models/stadium_time.model';
import { User } from 'src/users/models/user.model';
import { UserWallet } from 'src/user_wallet/models/user_wallet.model';

interface CartAttrs {
  user_id: number;
  user_wallet_id: number;
  st_times_id: number;
  date: Date;
  createdAt: Date;
  time_for_clear: Date;
  status_id: number;
}

@Table({ tableName: 'cart' })
export class Cart extends Model<Cart, CartAttrs> {
  @ApiProperty({ example: '1', description: 'id nomeri' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '1', description: 'user wallet id raqami' })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id: number;

  @ApiProperty({ example: '1', description: 'user wallet id raqami' })
  @ForeignKey(() => UserWallet)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_wallet_id: number;

  @ApiProperty({ example: '1', description: 'tahminiy vaqt' })
  @ForeignKey(() => StadiumTime)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  st_times_id: number;

  @ApiProperty({ example: '1', description: 'Kun' })
  @Column({
    type: DataType.DATE,
    defaultValue: Date.now(),
  })
  date: Date;

  @ApiProperty({ example: '1', description: 'Qachon qurilgani' })
  @Column({
    type: DataType.DATE,
    defaultValue: Date.now(),
  })
  createdAt: Date;

  @ApiProperty({ example: '1', description: 'tozlash vaqti' })
  @Column({
    type: DataType.DATE,
    defaultValue: Date.now(),
  })
  time_for_clear: Date;

  @ApiProperty({ example: '1', description: 'statusi' })
  @ForeignKey(() => Cart)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  status_id: number;
}
