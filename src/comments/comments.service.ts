import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import {Comment} from './models/comment.model'

@Injectable()
export class CommentsService {
  constructor(
    @InjectModel(Comment)
    private readonly commentsRepo: typeof Comment) {}

  async create(createCommentDto: CreateCommentDto) {
    const comments = await this.commentsRepo.create(createCommentDto)
    return comments
  }

  findAll() {
    return this.commentsRepo.findAll({include:{all:true}})
  }

  async findOne(id: number) {
    const comments = await this.commentsRepo.findOne({ where: { id } });
    if (!comments) {
      throw new BadRequestException('comment not found');
    }
    return comments;
  }

  async update(id: number, updatecommentDto: UpdateCommentDto) {
    const comments = await this.commentsRepo.findOne({ where: { id } });
    if (!comments) {
      throw new BadRequestException('comment not found');
    }
    const updated_comments = await this.commentsRepo.update(
      { ...updatecommentDto },
      { where: { id }, returning: true },
    );
    const response = {
      message: 'comment updated succesfully',
      orders: updated_comments[1][0],
    };
    return response;
  }

  async remove(id: number) {
    const comments = await this.commentsRepo.findOne({ where: { id } });
    if (comments) {
      throw new BadRequestException('comment not found');
    }
    await this.commentsRepo.destroy({ where: { id } });
    const response = {
      message: 'comment deleted succesfully',
      OrderID: id,
    };
    return response;
  }

}
