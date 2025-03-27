/* eslint-disable */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlacesService } from './places.service';
import { PlacesController } from './places.controller';
import { Place } from './entities/place.entity';
import { City } from '../cities/entities/city.entity';
import { ReviewsModule } from '../reviews/reviews.module';
import { CommentsModule } from '../comments/comments.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Place, City]),
        ReviewsModule,
        CommentsModule
    ],
    controllers: [PlacesController],
    providers: [PlacesService],
    exports: [PlacesService]
})
export class PlacesModule {}