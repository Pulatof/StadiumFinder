import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { response } from 'express';
import { CreateUserWalletDto } from './dto/create-user_wallet.dto';
import { UpdateUserWalletDto } from './dto/update-user_wallet.dto';
import { UserWallet } from './models/user_wallet.model';

@Injectable()
export class UserWalletService {
  constructor(
    @InjectModel(UserWallet)
    private readonly user_walletRepo: typeof UserWallet,
  ) {}

  async create(createUserWalletDto: CreateUserWalletDto) {
    const user_wallet = await this.user_walletRepo.create(createUserWalletDto);
    return user_wallet;
  }

  findAll() {
    return this.user_walletRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const user_wallet = await this.user_walletRepo.findOne({ where: { id } });
    if (!user_wallet) {
      throw new BadRequestException('user wallet not found');
    }
    return user_wallet;
  }

  async update(id: number, updateUserWalletDto: UpdateUserWalletDto) {
    const user_wallet = await this.user_walletRepo.findOne({ where: { id } });
    if (!user_wallet) {
      throw new BadRequestException('user wallet not found');
    }
    const updated_user_wallet = await this.user_walletRepo.update(
      { ...updateUserWalletDto },
      { where: { id }, returning: true },
    );

    const response = {
      message: 'user wallet updated succesfully',
      user_wallet: updated_user_wallet[1][0],
    };
    return response;
  }

  async remove(id: number) {
    const user_wallet = await this.user_walletRepo.findOne({where:{id}})
    if (!user_wallet){
      throw new BadRequestException('user wallet not found')
    }
   await this.user_walletRepo.destroy({where:{id}})
   const response = {
    message:'user wallet deleted succesfully',
    UserWalletID:id
   }
   return response
  }
}
