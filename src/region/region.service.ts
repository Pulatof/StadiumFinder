import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { District } from 'src/district/models/district.model';
import { CreateRegionDto } from './dto/create-region.dto';
import { UpdateRegionDto } from './dto/update-region.dto';
import { Region } from './models/region.model';

@Injectable()
export class RegionService {
  constructor(
    @InjectModel(Region)
    private readonly regionRepo: typeof Region,
    @InjectModel(District)
    private readonly districtRepo: typeof District,
  ) {}

  async create(createRegionDto: CreateRegionDto) {
    const region = await this.regionRepo.create(createRegionDto);
    return region;
  }

  async DistrictInRegion(id: number) {
    const districts = await this.districtRepo.findAll({
      where: { region_id: id },
    });
    return districts;
  }

  findAll() {
    return this.regionRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const region = await this.regionRepo.findOne({ where: { id } });
    if (!region) {
      throw new BadRequestException('region nor found');
    }
    return region;
  }

  async update(id: number, updateRegionDto: UpdateRegionDto) {
    const region = await this.regionRepo.findOne({ where: { id } });
    if (!region) {
      throw new BadRequestException('region not found');
    }
    const updated_region = await this.regionRepo.update(
      { ...updateRegionDto },
      { where: { id }, returning: true },
    );

    const response = {
      message: 'region updated succesfully',
      region: updated_region[1][0],
    };
    return response;
  }

  async remove(id: number) {
    const region = await this.regionRepo.findOne({ where: { id } });
    if (!region) {
      throw new BadRequestException('region not found');
    }
    await this.regionRepo.destroy({ where: { id } });
    const response = {
      message: 'region deleted succesfully',
      RegionID: id,
    };
    return response;
  }
}
