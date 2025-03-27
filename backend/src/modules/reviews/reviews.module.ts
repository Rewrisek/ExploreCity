/* eslint-disable */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReviewsService } from './reviews.service';
import { Review } from './entities/review.entity';
import { Place } from '../places/entities/place.entity';

@Module({
    imports: [
        TypeOrmModule.forFeature([Review, Place])
    ],
    providers: [ReviewsService],
    exports: [ReviewsService]
})
export class ReviewsModule {}