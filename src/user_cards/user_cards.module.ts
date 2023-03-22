import { Module } from '@nestjs/common';
import { UserCardsService } from './user_cards.service';
import { UserCardsController } from './user_cards.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { User_card } from './models/user_card.model';

@Module({
  imports:[SequelizeModule.forFeature([User_card])],
  controllers: [UserCardsController],
  providers: [UserCardsService]
})
export class UserCardsModule {}
