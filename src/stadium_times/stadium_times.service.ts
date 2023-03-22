import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Stadium } from 'src/stadiums/models/stadium.model';
import { CreateStadiumTimeDto } from './dto/create-stadium_time.dto';
import { UpdateStadiumTimeDto } from './dto/update-stadium_time.dto';
import { StadiumTime } from './models/stadium_time.model';

@Injectable()
export class StadiumTimesService {
  constructor(
    @InjectModel(StadiumTime)
    private readonly stadium_timesRepo: typeof StadiumTime,
  ) {}
  async create(createStadiumTimeDto: CreateStadiumTimeDto) {
    const stadium_times = await this.stadium_timesRepo.create(
      createStadiumTimeDto,
    );
    return stadium_times;
  }

  findAll() {
    return this.stadium_timesRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const stadium_times = await this.stadium_timesRepo.findOne({
      where: { id },
    });
    if (!stadium_times) {
      throw new BadRequestException('stadium_times not found');
    }
    return stadium_times;
  }

  async update(id: number, updateStadiumTimeDto: UpdateStadiumTimeDto) {
    const stadium_times = await this.stadium_timesRepo.findOne({
      where: { id },
    });
    if (!stadium_times) {
      throw new BadRequestException('stadium_times not found');
    }
    const updated_stadium_times = await this.stadium_timesRepo.update(
      { ...updateStadiumTimeDto },
      { where: { id }, returning: true },
    );
    const response = {
      message: 'stadium_time updated succesfully',
      stadium_times: updated_stadium_times[1][0],
    };
    return response;
  }

  async remove(id: number) {
    const stadium_times = await this.stadium_timesRepo.findOne({
      where: { id },
    });
    if (!stadium_times) {
      throw new BadRequestException('sradium_times not found');
    }
    await this.stadium_timesRepo.destroy({ where: { id } });
    const response = {
      message: 'stadium_times deleted succesfully',
      StadiumTimesID: id,
    };
    return response;
  }
}
