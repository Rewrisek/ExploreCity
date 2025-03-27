/* eslint-disable */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Place } from './entities/place.entity';
import { City } from '../cities/entities/city.entity';
import { CreatePlaceDto } from './dto/create-place.dto';
import { PlaceResponseDto } from './dto/place-response.dto';
import { PlaceType } from '../../shared/enums/place-type.enum';

@Injectable()
export class PlacesService {
    constructor(
        @InjectRepository(Place)
        private placeRepository: Repository<Place>,
        @InjectRepository(City)
        private cityRepository: Repository<City>,
    ) {}

    async findPlacesByCity(cityId: number): Promise<PlaceResponseDto[]> {
        // Verify city exists
        const city = await this.cityRepository.findOne({ where: { id: cityId } });
        if (!city) {
            throw new NotFoundException('City not found');
        }

        const places = await this.placeRepository.find({
            where: { cityId },
            order: { name: 'ASC' }
        });

        return places.map(place => ({
            id: place.id,
            type: place.type,
            name: place.name,
            description: place.description,
            address: place.address,
            image: place.image,
            cityId: place.cityId,
            rating: {
                averageRating: place.averageRating,
                totalReviews: place.totalReviews
            }
        }));
    }

    async createPlace(
        cityId: number,
        createPlaceDto: CreatePlaceDto
    ): Promise<PlaceResponseDto> {
        // Verify city exists
        const city = await this.cityRepository.findOne({ where: { id: cityId } });
        if (!city) {
            throw new NotFoundException('City not found');
        }

        const place = this.placeRepository.create({
            ...createPlaceDto,
            cityId,
            averageRating: 0,
            totalReviews: 0
        });

        await this.placeRepository.save(place);

        return {
            id: place.id,
            type: place.type,
            name: place.name,
            description: place.description,
            address: place.address,
            image: place.image,
            cityId: place.cityId,
            rating: {
                averageRating: 0,
                totalReviews: 0
            }
        };
    }

    async findOnePlace(placeId: number): Promise<PlaceResponseDto> {
        const place = await this.placeRepository.findOne({ where: { id: placeId } });
        if (!place) {
            throw new NotFoundException('Place not found');
        }

        return {
            id: place.id,
            type: place.type,
            name: place.name,
            description: place.description,
            address: place.address,
            image: place.image,
            cityId: place.cityId,
            rating: {
                averageRating: place.averageRating,
                totalReviews: place.totalReviews
            }
        };
    }

    getPlaceTypes(): string[] {
        return Object.values(PlaceType);
    }
}