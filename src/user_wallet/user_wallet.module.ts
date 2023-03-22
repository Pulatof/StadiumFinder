import { Module } from '@nestjs/common';
import { UserWalletService } from './user_wallet.service';
import { UserWalletController } from './user_wallet.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { UserCardsService } from 'src/user_cards/user_cards.service';
import { UserWallet } from './models/user_wallet.model';
import { User } from 'src/users/models/user.model';

@Module({
  imports:[SequelizeModule.forFeature([User, UserWallet])],
  controllers: [UserWalletController],
  providers: [UserWalletService]
})
export class UserWalletModule {}
