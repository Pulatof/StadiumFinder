import { Module } from '@nestjs/common';
import { RegionService } from './region.service';
import { RegionController } from './region.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Region } from './models/region.model';
import { DiscoveryModule } from '@nestjs/core';
import { District } from 'src/district/models/district.model';
import { DistrictModule } from 'src/district/district.module';

@Module({
  imports:[SequelizeModule.forFeature([Region, District]), DistrictModule],
  controllers: [RegionController],
  providers: [RegionService]
})
export class RegionModule {}
