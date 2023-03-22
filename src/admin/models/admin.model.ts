import { ApiProperty } from '@nestjs/swagger';
import {
  AllowNull,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';

interface AdminAttrs {
  user_name: string;
  email: string;
  phone: string;
  hashed_password: string;
  is_active: boolean;
  is_creator: boolean;
  hashed_refresh_token: string;
}

@Table({ tableName: 'admin' })
export class Admin extends Model<Admin, AdminAttrs> {
  @ApiProperty({ example: '1', description: 'Unique ID' })
  @Column({
    type: DataType.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  })
  id: number;

  @ApiProperty({
    example: 'foydalanuvchi niki',
    description: 'Foydalanuvchi nikneymi',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  user_name: string;

  @ApiProperty({
    example: 'admin emaili',
    description: 'Admin elektron pochtasi',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  email: string;

  @ApiProperty({
    example: 'admin phone',
    description: 'adminning telefon raqami',
  })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  phone: string;

  @ApiProperty({ example: 'admin passwaord', description: 'adminnning paroli' })
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  hashed_password: string;

  @ApiProperty({
    example: 'false',
    description: 'adminning tasdiqlanganlik holati',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_active: boolean;

  @ApiProperty({
    example: 'false',
    description: 'adminning tasdiqlanganlik holati',
  })
  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  is_creator: boolean;

  @ApiProperty({ example: 'token', description: 'Hashlangan token' })
  @Column({
    type: DataType.STRING,
  })
  hashed_refresh_token: string;
}
