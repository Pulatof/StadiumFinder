import { ApiProperty } from '@nestjs/swagger';
import {
  AllowNull,
  Column,
  DataType,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { StadiumTime } from 'src/stadium_times/models/stadium_time.model';
import { User } from 'src/users/models/user.model';
import { UserWallet } from 'src/user_wallet/models/user_wallet.model';

interface OrderAttrs {
  user_id: number;
  user_wallet_id: number;
  st_time_id: number;
  date: number;
  createdAt: number;
  status_id: number;
}

@Table({tableName:'orders'})
export class Order extends Model<Order, OrderAttrs> {
  @ApiProperty({
    example: 'categoriya id',
    description: 'Stadionning turi categoriyasi',
  })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'categoriya id',
    description: 'Stadionning turi categoriyasi',
  })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_id: number;

  @ApiProperty({
    example: 'categoriya id',
    description: 'Stadionning turi categoriyasi',
  })
  @ForeignKey(() => UserWallet)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  user_wallet_id: number;

  @ApiProperty({
    example: 'categoriya id',
    description: 'Stadionning turi categoriyasi',
  })
  @ForeignKey(() => StadiumTime)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  st_time_id: number;

  @ApiProperty({
    example: 'categoriya id',
    description: 'Stadionning turi categoriyasi',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  date: number;

  @ApiProperty({
    example: 'categoriya id',
    description: 'Stadionning turi categoriyasi',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  createdAt: number;

  @ApiProperty({
    example: 'categoriya id',
    description: 'Stadionning turi categoriyasi',
  })
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  status_id: number;
}
