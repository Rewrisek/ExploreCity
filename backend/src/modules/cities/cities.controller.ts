/* eslint-disable */
import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    ParseIntPipe
} from '@nestjs/common';
import { CitiesService } from './cities.service';
import { PlacesService } from '../places/places.service';
import { CreateCityDto } from './dto/create-city.dto';
import { CreatePlaceDto } from '../places/dto/create-place.dto';

@Controller('cities')
export class CitiesController {
    constructor(
        private readonly citiesService: CitiesService,
        private readonly placesService: PlacesService
    ) {}

    @Get()
    async getCities() {
        return this.citiesService.findAll();
    }

    @Get(':id/places')
    async getCityPlaces(@Param('id', ParseIntPipe) cityId: number) {
        return this.placesService.findPlacesByCity(cityId);
    }

    @Post(':id/places')
    async createPlace(
        @Param('id', ParseIntPipe) cityId: number,
        @Body() createPlaceDto: CreatePlaceDto
    ) {
        console.log('Received cityId:', cityId);
        console.log('Received createPlaceDto:', createPlaceDto);
        return this.placesService.createPlace(cityId, createPlaceDto);
    }
}