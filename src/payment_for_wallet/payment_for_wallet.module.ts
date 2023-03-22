import { Module } from '@nestjs/common';
import { PaymentForWalletService } from './payment_for_wallet.service';
import { PaymentForWalletController } from './payment_for_wallet.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/users/models/user.model';
import { User_card } from 'src/user_cards/models/user_card.model';
import { PaymentForWallet } from './models/payment_for_wallet.model';

@Module({
  imports:[SequelizeModule.forFeature([User, User_card, PaymentForWallet])],
  controllers: [PaymentForWalletController],
  providers: [PaymentForWalletService]
})
export class PaymentForWalletModule {}
