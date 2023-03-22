import { Module } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CommentsController } from './comments.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Comment } from './models/comment.model';
import { User } from 'src/users/models/user.model';
import { Stadium } from 'src/stadiums/models/stadium.model';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[SequelizeModule.forFeature([Comment, User, Stadium]), JwtModule],
  controllers: [CommentsController],
  providers: [CommentsService]
})
export class CommentsModule {}
