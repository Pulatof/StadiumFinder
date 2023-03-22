import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './models/category.model';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectModel(Category)
    private readonly categoryRepo:typeof Category
  ){}

  async create(createCategoryDto: CreateCategoryDto) {
    const categories = await this.categoryRepo.create(createCategoryDto)
    return categories
  }
  

  findAll() {
    return this.categoryRepo.findAll({include:{ all:true }})
  }

  async findOne(id: number) {
    const categories = await this.categoryRepo.findOne({where:{id}})
    if(!categories){
      throw new BadRequestException('category not found')
    }
    return categories
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const categories = await this.categoryRepo.findOne({where:{id}})
    if (!categories){
      throw new BadRequestException('category not found')
    }
    const updated_categories = await this.categoryRepo.update(
      {...updateCategoryDto},
      {where:{id}, returning:true})

    const response = {
      message:'category updated succesfully',
      categories: updated_categories[1][0]
    }
    return response
  }

  async remove(id: number) {
    const categories = await this.categoryRepo.findOne({where:{id}})
    if (!categories){
      throw new BadRequestException('category nor found')
    }
    await this.categoryRepo.destroy({where:{id}})
    const response = {
      message:'category deleted',
      CategorID:id
    }
    return response
  }
}
