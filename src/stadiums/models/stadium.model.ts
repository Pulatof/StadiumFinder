import { ApiProperty } from '@nestjs/swagger';
import { TimerifyOptions } from 'perf_hooks';
import { Timestamp } from 'rxjs';
import {} from 'sequelize';
import {
  Column,
  DataType,
  ForeignKey,
  Table,
  Model,
} from 'sequelize-typescript';
import { Category } from 'src/categories/models/category.model';
import { User } from 'src/users/models/user.model';

interface StadiumAttrs {
  category_id: number;
  owner_id: number;
  contact_with: string;
  name: string;
  volume: string;
  adress: string;
  region_id: number;
  city_id: number;
  district_id: number;
  location: string;
  builtAt: Date;
  start_time: string;
  end_time: string;
}

@Table({ tableName: 'stadiums' })
export class Stadium extends Model<Stadium, StadiumAttrs> {
  @ApiProperty({ example: '1', description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({ example: '2', description: 'Unique ID' })
  @ForeignKey(() => Category)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  category_id: number;

  @ApiProperty({ example: '3', description: 'Unique ID' })
  @ForeignKey(() => User)
  @Column({
    type: DataType.INTEGER,
  })
  owner_id: number;

  @ApiProperty({
    example: 'owner bn boglanish',
    description: 'Boglanish uchun telefon',
  })
  @Column({
    type: DataType.STRING,
  })
  contact_with: string;

  @ApiProperty({ example: 'stadion nomi', description: 'stadionning nomi' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  name: string;

  @ApiProperty({
    example: 'user ismi',
    description: 'Foydalanuvchi ismi & Firstname of user',
  })
  @Column({
    type: DataType.STRING,
  })
  volume: string;

  @ApiProperty({
    example: 'stadion adresi',
    description: 'fudbol stadioni manzili',
  })
  @Column({
    type: DataType.STRING,
  })
  adress: string;

  @ApiProperty({
    example: 'viloyat',
    description: 'stadion joylashgan viloyatning id si',
  })
  @Column({
    type: DataType.INTEGER,
  })
  region_id: number;

  @ApiProperty({
    example: 'shahar',
    description: 'stadion joylashgan shaharning id si',
  })
  @Column({
    type: DataType.INTEGER,
  })
  city_id: number;

  @ApiProperty({
    example: 'rayon',
    description: 'stadion joylashgan tumanning id si',
  })
  @Column({
    type: DataType.INTEGER,
  })
  district_id: number;

  @ApiProperty({
    example: 'stadion locatsiyasi',
    description: 'stadion joylashgan manzil lakatsiyasi',
  })
  @Column({
    type: DataType.STRING,
  })
  location: string;

  @ApiProperty({
    example: 'qurilgan yili',
    description: 'stadion qurilgan vaqti',
  })
  @Column({
    type: DataType.DATE,
    defaultValue: Date.now()
  })
  buildAt: Date;

  @ApiProperty({
    example: 'ish vaqti',
    description: 'stadion ish vaqti boshlanishi',
  })
  @Column({
    type: DataType.STRING,
  })
  start_time: string;

  @ApiProperty({
    example: 'ish vaqti',
    description: 'stadion ishnvaqti tugashi',
  })
  @Column({
    type: DataType.STRING,
  })
  end_time: string;
}
