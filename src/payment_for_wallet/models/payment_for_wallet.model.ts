import { ApiProperty } from "@nestjs/swagger";
import { Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript"
import { User } from "src/users/models/user.model";
import { User_card } from "src/user_cards/models/user_card.model";

interface PaymentForWalletAtrrs{
    user_id:number
    card_id:number
    amount:number
}

@Table({tableName:'payment_for_wallet'})
export class PaymentForWallet extends Model<PaymentForWallet, PaymentForWalletAtrrs>{
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
      @ForeignKey(() => User_card)
      @Column({
        type: DataType.INTEGER,
        allowNull: false,
      })
      card_id: number;

      @ApiProperty({ example: '', description: '' })
      @Column({
        type: DataType.INTEGER,
        allowNull: false,
      })
     amount: number;
}

