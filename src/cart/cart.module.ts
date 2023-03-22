import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { StadiumTime } from 'src/stadium_times/models/stadium_time.model';
import { UserWallet } from 'src/user_wallet/models/user_wallet.model';
import { User } from 'src/users/models/user.model';
import { Cart } from './models/cart.model';

@Module({
  imports:[SequelizeModule.forFeature([Cart, User, StadiumTime, UserWallet])],
  controllers: [CartController],
  providers: [CartService]
})
export class CartModule {}
