import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateStadiumDto } from './dto/create-stadium.dto';
import { UpdateStadiumDto } from './dto/update-stadium.dto';
import { Stadium } from './models/stadium.model';

@Injectable()
export class StadiumsService {
  constructor(
    @InjectModel(Stadium) private readonly stadiumRepo: typeof Stadium,
  ) {}


  async create(createStadiumDto: CreateStadiumDto) {
    const stadium = await this.stadiumRepo.create(createStadiumDto)
    return stadium 
  }
    
    
  findAll() {
    return this.stadiumRepo.findAll({include:{all:true}})
  }

  async findOne(id: number) {
    const stadium = await this.stadiumRepo.findOne({where:{id}})
    if (!stadium){
      throw new BadRequestException('stadium not found')
    }
    return stadium
  }

  async update(id: number, updateStadiumDto: UpdateStadiumDto) {
    const stadium = await this.stadiumRepo.findOne({where:{id}})
    if (!stadium){
      throw new BadRequestException('stadium not found')
    }
    const updatedStadium = await this.stadiumRepo.update(
      {...updateStadiumDto},
      {where:{id}, returning:true})

      const response = {
        message: 'Stadium updated successfully',
        stadium: updatedStadium[1][0],
      };
      return response;
  }
  


  async remove(id: number) {
    const stadium = await this.stadiumRepo.findOne({where:{id}})
    if (!stadium){
      throw new BadRequestException("stadium not found")
    }
    await this.stadiumRepo.destroy({ where: { id } });
    const response = {
      message: 'stadium deleted',
      StadiumID: id,
    };
    return response;
  }

}
