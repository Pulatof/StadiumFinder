import { Module } from '@nestjs/common';
import { StadiumsService } from './stadiums.service';
import { StadiumsController } from './stadiums.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Stadium } from './models/stadium.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[SequelizeModule.forFeature([Stadium]),JwtModule],
  controllers: [StadiumsController],
  providers: [StadiumsService]
})
export class StadiumsModule {}
