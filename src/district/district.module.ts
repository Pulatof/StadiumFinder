import { Module } from '@nestjs/common';
import { DistrictService } from './district.service';
import { DistrictController } from './district.controller';
import { Sequelize } from 'sequelize';
import { SequelizeModule } from '@nestjs/sequelize';
import { District } from './models/district.model';
import { Region } from 'src/region/models/region.model';

@Module({
  imports:[SequelizeModule.forFeature([District, Region])],
  controllers: [DistrictController],
  providers: [DistrictService]
})
export class DistrictModule {}
