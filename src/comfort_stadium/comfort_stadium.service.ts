import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateComfortStadiumDto } from './dto/create-comfort_stadium.dto';
import { UpdateComfortStadiumDto } from './dto/update-comfort_stadium.dto';
import { ComfortStadium } from './models/comfort_stadium.model';

@Injectable()
export class ComfortStadiumService {
  constructor(
  @InjectModel(ComfortStadium)
    private readonly comfort_stadiumRepo:typeof ComfortStadium
  ){}

  async create(createComfortStadiumDto: CreateComfortStadiumDto) {
    const comfort_stadium = await this.comfort_stadiumRepo.create(createComfortStadiumDto)
    return comfort_stadium
  }

  findAll() {
    return this.comfort_stadiumRepo.findAll({include:{all:true}})
  }

  async findOne(id: number) {
    const comfort_stadium = await this.comfort_stadiumRepo.findOne({ where: { id } });
    if (!comfort_stadium) {
      throw new BadRequestException('comfort_stadium not found');
    }
    return comfort_stadium;
  }

  async update(id: number, updatecomfort_stadiumDto: UpdateComfortStadiumDto) {
    const comfort_stadium = await this.comfort_stadiumRepo.findOne({ where: { id } });
    if (!comfort_stadium) {
      throw new BadRequestException('comfort_stadium not found');
    }
    const updated_comfort_stadium = await this.comfort_stadiumRepo.update(
      { ...updatecomfort_stadiumDto },
      { where: { id }, returning: true },
    );
    const response = {
      message: 'comfort_stadium updated succesfully',
      orders: updated_comfort_stadium[1][0],
    };
    return response;
  }

  async remove(id: number) {
    const comfort_stadium = await this.comfort_stadiumRepo.findOne({ where: { id } });
    if (comfort_stadium) {
      throw new BadRequestException('comfort_stadium not found');
    }
    await this.comfort_stadiumRepo.destroy({ where: { id } });
    const response = {
      message: 'comfort_stadium deleted succesfully',
      OrderID: id,
    };
    return response;
  }


}
