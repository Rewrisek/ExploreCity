/* eslint-disable */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from './entities/city.entity';
import { Place } from '../places/entities/place.entity';
import { CitiesService } from './cities.service';
import { PlacesService } from '../places/places.service';
import { CitiesController } from './cities.controller';

@Module({
    imports: [TypeOrmModule.forFeature([City, Place])],
    controllers: [CitiesController],
    providers: [CitiesService, PlacesService],
})
export class CitiesModule {}