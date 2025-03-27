/* eslint-disable */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsService } from './comments.service';
import { Comment } from './entities/comment.entity';
import { Review } from '../reviews/entities/review.entity';
import { Place } from '../places/entities/place.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Comment, Review, Place])
    ],
    providers: [CommentsService],
    exports: [CommentsService]
})
export class CommentsModule {}