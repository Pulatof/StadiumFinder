import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateComfortDto } from './dto/create-comfort.dto';
import { UpdateComfortDto } from './dto/update-comfort.dto';
import { Comfort } from './models/comfort.model';

@Injectable()

export class ComfortService {
  constructor(
    @InjectModel(Comfort)
    private readonly comfortRepo:typeof Comfort
  ){}

  async create(createComfortDto: CreateComfortDto) {
    const comfort = await this.comfortRepo.create(createComfortDto)
    return comfort
  }

  findAll() {
    return this.comfortRepo.findAll({include:{all:true}})
  }

  async findOne(id: number) {
    const comfort = await this.comfortRepo.findOne({ where: { id } });
    if (!comfort) {
      throw new BadRequestException('comfort not found');
    }
    return comfort;
  }

  async update(id: number, updatecomfortDto: UpdateComfortDto) {
    const comfort = await this.comfortRepo.findOne({ where: { id } });
    if (!comfort) {
      throw new BadRequestException('comfort not found');
    }
    const updated_comfort = await this.comfortRepo.update(
      { ...updatecomfortDto },
      { where: { id }, returning: true },
    );
    const response = {
      message: 'comfort updated succesfully',
      orders: updated_comfort[1][0],
    };
    return response;
  }

  async remove(id: number) {
    const comfort = await this.comfortRepo.findOne({ where: { id } });
    if (comfort) {
      throw new BadRequestException('comfort not found');
    }
    await this.comfortRepo.destroy({ where: { id } });
    const response = {
      message: 'comfort deleted succesfully',
      OrderID: id,
    };
    return response;
  }

}
