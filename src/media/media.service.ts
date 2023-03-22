import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateMediaDto } from './dto/create-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { Media } from './models/media.model';

@Injectable()
export class MediaService {
  constructor(
    @InjectModel(Media)
    private readonly mediaRepo: typeof Media,
  ) {}

  async create(createMediaDto: CreateMediaDto) {
    const media = await this.mediaRepo.create(createMediaDto);
    return media;
  }

  findAll() {
    return this.mediaRepo.findAll({ include: { all: true } });
  }

  async findOne(id: number) {
    const media = await this.mediaRepo.findOne({where:{id}});
    if (!media) {
      throw new BadRequestException('media not found');
    }
    return media;
  }

  async update(id: number, updateMediaDto: UpdateMediaDto) {
    const media = await this.mediaRepo.findOne({ where: { id } });
    if (!media) {
      throw new BadRequestException('media not found');
    }
    const updated_media = await this.mediaRepo.update(
      {...updateMediaDto },
      { where: { id }, returning: true },
    );
    const response = {
      message: 'media updated succesfully',
      media: updated_media[1][0],
    };
    return response;
  }

  async remove(id: number) {
    const media = await this.mediaRepo.findOne({ where: { id } });
    if (!media) {
      throw new BadRequestException('media not found');
    }
    await this.mediaRepo.destroy({ where: { id } });
    const response = {
      message: 'media deleted succesfully',
      MediaID: id,
    };
    return response;
  }
}