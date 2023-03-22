import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Order } from './models/order.model';
import { User } from 'src/users/models/user.model';
import { UserWallet } from 'src/user_wallet/models/user_wallet.model';
import { StadiumTime } from 'src/stadium_times/models/stadium_time.model';

@Module({
  imports:[SequelizeModule.forFeature([Order, User, UserWallet, StadiumTime])],
  controllers: [OrdersController],
  providers: [OrdersService]
})
export class OrdersModule {}
