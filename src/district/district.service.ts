import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateDistrictDto } from './dto/create-district.dto';
import { UpdateDistrictDto } from './dto/update-district.dto';
import { District } from './models/district.model';

@Injectable()
export class DistrictService {
  constructor(
    @InjectModel(District)
    private readonly districtRepo: typeof District,
  ) {}
  async create(createDistrictDto: CreateDistrictDto) {
    const district = await this.districtRepo.create(createDistrictDto);
    return district;
  }

  findAll() {
    return this.districtRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const district = await this.districtRepo.findOne({ where: { id } });
    if (!district) {
      throw new BadRequestException('district nor found');
    }
    return district;
  }

  async update(id: number, updateDistrictDto: UpdateDistrictDto) {
    const district = await this.districtRepo.findOne({ where: { id } });
    if (!district) {
      throw new BadRequestException('district not found');
    }
    const updated_district = await this.districtRepo.update(
      { ...updateDistrictDto },
      { where: { id }, returning: true },
    );

    const response = {
      message: 'district updated succesfully',
      district: updated_district[1][0],
    };
    return response;
  }

  async remove(id: number) {
    const district = await this.districtRepo.findOne({ where: { id } });
    if (!district) {
      throw new BadRequestException('district not found');
    }
    await this.districtRepo.destroy({ where: { id } });
    const response = {
      message: 'district deleted succesfully',
      DistrictID: id,
    };
    return response;
  }
}
