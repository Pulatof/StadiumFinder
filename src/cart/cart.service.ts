import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCartDto } from './dto/create-cart.dto';
import { UpdateCartDto } from './dto/update-cart.dto';
import { Cart } from './models/cart.model';

@Injectable()
export class CartService {
  constructor(
    @InjectModel(Cart)
    private readonly cartRepo: typeof Cart,
  ) {}

  async create(createCartDto: CreateCartDto) {
    const cart = await this.cartRepo.create(createCartDto);
    return cart;
  }

  findAll() {
    return this.cartRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const cart = await this.cartRepo.findOne({ where: { id } });
    if (!cart) {
      throw new BadRequestException('cart not found');
    }
    return cart;
  }

  async update(id: number, updateCartDto: UpdateCartDto) {
    const cart = await this.cartRepo.findOne({ where: { id } });
    if (!cart) {
      throw new BadRequestException('cart not found');
    }
    const updated_cart = await this.cartRepo.update(
      { ...updateCartDto },
      { where: { id }, returning: true },
    );
    const response = {
      message: 'cart updated succesfully',
      cart: updated_cart[1][0],
    };
    return response;
  }

  async remove(id: number) {
    const cart = await this.cartRepo.findOne({where:{id}})
    if (!cart){
      throw new BadRequestException('cart not found')
    }
    await this.cartRepo.destroy({where:{id}})
    const response={
      message:'cart deleted succesfully',
      CardID:id
    }
    return response
}
}