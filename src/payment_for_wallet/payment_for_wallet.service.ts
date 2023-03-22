import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePaymentForWalletDto } from './dto/create-payment_for_wallet.dto';
import { UpdatePaymentForWalletDto } from './dto/update-payment_for_wallet.dto';
import { PaymentForWallet } from './models/payment_for_wallet.model';

@Injectable()
export class PaymentForWalletService {
  constructor(
    @InjectModel(PaymentForWallet)
    private readonly payment_for_walletRepo: typeof PaymentForWallet,
  ) {}

  async create(createPaymentForWalletDto: CreatePaymentForWalletDto) {
    const payment_for_wallet = await this.payment_for_walletRepo.create(
      createPaymentForWalletDto,
    );
    return payment_for_wallet;
  }

  findAll() {
    return this.payment_for_walletRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const payment_for_wallet = await this.payment_for_walletRepo.findOne({
      where: { id },
    });
    if (!payment_for_wallet) {
      throw new BadRequestException('payforwall not found');
    }
    return payment_for_wallet;
  }

  async update(
    id: number,
    updatePaymentForWalletDto: UpdatePaymentForWalletDto,
  ) {
    const payment_for_wallet = await this.payment_for_walletRepo.findOne({
      where: { id },
    });
    if (!payment_for_wallet) {
      throw new BadRequestException('payforwall not found');
    }
    const updated_payment_for_wallet = await this.payment_for_walletRepo.update(
      { ...updatePaymentForWalletDto },
      { where: { id }, returning: true },
    );
    const response = {
      message: 'payforwall not found updated succesfully',
      payment_for_wallet: updated_payment_for_wallet[1][0],
    };
    return response;
  }

  async remove(id: number) {
    const payment_for_wallet = await this.payment_for_walletRepo.findOne({
      where: { id },
    });
    if (!payment_for_wallet) {
      throw new BadRequestException('updated_payment_for_wallet not found');
    }
    await this.payment_for_walletRepo.destroy({ where: { id } });
    const response = {
      message: 'payforwall deleted succesfully',
      PaymentForWalletID: id,
    };
    return response;
  }
}
