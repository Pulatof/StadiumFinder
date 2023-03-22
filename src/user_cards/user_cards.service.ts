import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserCardDto } from './dto/create-user_card.dto';
import { UpdateUserCardDto } from './dto/update-user_card.dto';
import { User_card } from './models/user_card.model';

@Injectable()
export class UserCardsService {
  constructor(
    @InjectModel(User_card)
    private readonly user_cardRepo: typeof User_card
  ){}
  
  async create(createUserCardDto: CreateUserCardDto) {
    const user_card = await this.user_cardRepo.create(createUserCardDto)
    return user_card
  }
  

  findAll() {
    return this.user_cardRepo.findAll({include:{all:true}})
  }

  async findOne(id: number) {
    const user_card = await this.user_cardRepo.findOne({where:{id}})
    if (!user_card){
      throw new BadRequestException('user_card not found')
    }
    return user_card
  }

  async update(id: number, updateUserCardDto: UpdateUserCardDto) {
    const user_card = await this.user_cardRepo.findOne({where:{id}})
    if (!user_card){
      throw new BadRequestException('user_card not found')
    }
    const updated_user_card = await this.user_cardRepo.update(
      {...updateUserCardDto},
      {where:{id}, returning:true})
    const response = {
      message:'User card updates succesfully',
      user_card:updated_user_card[1][0]
    }
    return response
  }

  async remove(id: number) {
    const user_card = await this.user_cardRepo.findOne({where:{id}})
    if (!user_card){
      throw new BadRequestException('user card not found')
    }
    await this.user_cardRepo.destroy({where:{id}})
    const response = {
      message:'user card deleted succesfully',
      UserCardID:id
    }
    return response
  }
}
