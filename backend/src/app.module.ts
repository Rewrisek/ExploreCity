/* eslint-disable */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { City } from './modules/cities/entities/city.entity';
import { Place } from './modules/places/entities/place.entity';
import { Review } from './modules/reviews/entities/review.entity';
import { Comment } from './modules/comments/entities/comment.entity';

import { CitiesModule } from './modules/cities/cities.module';
import { PlacesModule } from './modules/places/places.module';
import { ReviewsModule } from './modules/reviews/reviews.module';
import { CommentsModule } from './modules/comments/comments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'BotRewri123**',
      database: 'explore_city',
      entities: [City, Place, Review, Comment],
      synchronize: true, // Use only in development
      autoLoadEntities: true,
    }),
    CitiesModule,
    PlacesModule,
    ReviewsModule,
    CommentsModule,
  ],
})
export class AppModule {}