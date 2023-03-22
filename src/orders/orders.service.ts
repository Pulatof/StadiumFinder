import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './models/order.model';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order)
    private readonly ordersRepo: typeof Order,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const orders = await this.ordersRepo.create(createOrderDto);
    return orders;
  }

  findAll() {
    return this.ordersRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const orders = await this.ordersRepo.findOne({ where: { id } });
    if (!orders) {
      throw new BadRequestException('order not found');
    }
    return orders;
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const orders = await this.ordersRepo.findOne({ where: { id } });
    if (!orders) {
      throw new BadRequestException('order not found');
    }
    const updated_orders = await this.ordersRepo.update(
      { ...updateOrderDto },
      { where: { id }, returning: true },
    );
    const response = {
      message: 'order updated succesfully',
      orders: updated_orders[1][0],
    };
    return response;
  }

  async remove(id: number) {
    const orders = await this.ordersRepo.findOne({ where: { id } });
    if (!orders) {
      throw new BadRequestException('order not found');
    }
    await this.ordersRepo.destroy({ where: { id } });
    const response = {
      message: 'order deleted succesfully',
      OrderID: id,
    };
    return response;
  }
}
