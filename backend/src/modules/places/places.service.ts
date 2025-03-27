import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Place } from './entities/place.entity';
import { CreatePlaceDto } from './dto/create-place.dto';
import { CitiesService } from '../cities/cities.service';

@Injectable()
export class PlacesService {
    constructor(
        @InjectRepository(Place)
        private placeRepository: Repository<Place>,
        private citiesService: CitiesService,
    ) {}

    async create(createPlaceDto: CreatePlaceDto): Promise<Place> {
        // Verify city exists
        await this.citiesService.findOne(createPlaceDto.cityId);

        const place = this.placeRepository.create({
            ...createPlaceDto,
            averageRating: 0,
            totalReviews: 0
        });
        return await this.placeRepository.save(place);
    }

    async findByCity(cityId: number): Promise<Place[]> {
        // Verify city exists
        await this.citiesService.findOne(cityId);

        return await this.placeRepository.find({
            where: { cityId },
            order: { name: 'ASC' }
        });
    }

    async findOne(id: number): Promise<Place> {
        const place = await this.placeRepository.findOne({
            where: { id },
            relations: ['city', 'reviews']
        });
        if (!place) {
            throw new NotFoundException(`Place with ID ${id} not found`);
        }
        return place;
    }
}