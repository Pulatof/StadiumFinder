import { Module } from '@nestjs/common';
import { ComfortStadiumService } from './comfort_stadium.service';
import { ComfortStadiumController } from './comfort_stadium.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { ComfortStadium } from './models/comfort_stadium.model';
import { Stadium } from 'src/stadiums/models/stadium.model';
import { Comfort } from 'src/comfort/models/comfort.model';

@Module({
  imports:[SequelizeModule.forFeature([ComfortStadium, Stadium, Comfort])],
  controllers: [ComfortStadiumController],
  providers: [ComfortStadiumService]
})
export class ComfortStadiumModule {}
