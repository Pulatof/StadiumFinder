import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { User } from './users/models/user.model';
import { UsersModule } from './users/users.module';
import { StadiumsModule } from './stadiums/stadiums.module';
import { Stadium } from './stadiums/models/stadium.model';
import { CategoriesModule } from './categories/categories.module';
import { UserCardsModule } from './user_cards/user_cards.module';
import { StadiumTimesModule } from './stadium_times/stadium_times.module';
import { Category } from './categories/models/category.model';
import { User_card } from './user_cards/models/user_card.model';
import { StadiumTime } from './stadium_times/models/stadium_time.model';
import { UserWalletModule } from './user_wallet/user_wallet.module';
import { UserWallet } from './user_wallet/models/user_wallet.model';
import { AdminModule } from './admin/admin.module';
import { Admin } from './admin/models/admin.model';
import { CartModule } from './cart/cart.module';
import { Cart } from './cart/models/cart.model';
import { OrdersModule } from './orders/orders.module';
import { PaymentForWalletModule } from './payment_for_wallet/payment_for_wallet.module';
import { Order } from './orders/models/order.model';
import { PaymentForWallet } from './payment_for_wallet/models/payment_for_wallet.model';
import { CommentsModule } from './comments/comments.module';
import { Comment } from './comments/models/comment.model';
import { MediaModule } from './media/media.module';
import { Media } from './media/models/media.model';
import { MailModule } from './mail/mail.module';
import { DistrictModule } from './district/district.module';
import { RegionModule } from './region/region.module';
import { Region } from './region/models/region.model';
import { District } from './district/models/district.model';
import { ComfortModule } from './comfort/comfort.module';
import { Comfort } from './comfort/models/comfort.model';
import { ComfortStadiumModule } from './comfort_stadium/comfort_stadium.module';
import { ComfortStadium } from './comfort_stadium/models/comfort_stadium.model';
import { TelegrafModule } from 'nestjs-telegraf';
import { BotModule } from './bot/bot.module';
import { BOT_NAME } from './app.constants';
import { Bot } from './bot/models/bot.model';
import { OtpModule } from './otp/otp.module';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      botName:BOT_NAME,
      useFactory:()=>({
        token:process.env.BOT_TOKEN,
        middlewares:[],
        include:[BotModule]
      }),
    }),
    ConfigModule.forRoot({ envFilePath: `.env`, isGlobal:true }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.POSTGRES_HOST,
      port: Number(process.env.POSTGRES_PORT),
      username: process.env.POSTGRES_USER,
      password: String(process.env.POSTGRES_PASSWORD),
      database: process.env.POSTGRES_DB,
      models: [User, Bot, Stadium, Category, Comfort, User_card, ComfortStadium, StadiumTime, Region, District, UserWallet, Admin, Cart, Order, Media, Comment, PaymentForWallet],
      autoLoadModels: true,
      logging: false,
    }),
    UsersModule,
    StadiumsModule,
    CategoriesModule,
    UserCardsModule,
    StadiumTimesModule,
    UserWalletModule,
    AdminModule,
    CartModule,
    OrdersModule,
    PaymentForWalletModule,
    CommentsModule,
    MediaModule,
    MailModule,
    DistrictModule,
    RegionModule,
    ComfortModule,
    ComfortStadiumModule,
    BotModule,
    OtpModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
