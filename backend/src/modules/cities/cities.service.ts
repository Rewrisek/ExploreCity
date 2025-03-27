/* eslint-disable */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from './entities/city.entity';
import { CreateCityDto } from './dto/create-city.dto';
import { CityResponseDto } from './dto/city-response.dto';

@Injectable()
export class CitiesService {
    constructor(
        @InjectRepository(City)
        private cityRepository: Repository<City>,
    ) {}

    async findAll(): Promise<CityResponseDto[]> {
        const cities = await this.cityRepository.find({
            order: { name: 'ASC' }
        });
        return cities.map(city => ({
            id: city.id,
            name: city.name,
            imageUrl: city.imageUrl
        }));
    }

    async create(createCityDto: CreateCityDto): Promise<CityResponseDto> {
        const city = this.cityRepository.create(createCityDto);
        await this.cityRepository.save(city);
        return {
            id: city.id,
            name: city.name,
            imageUrl: city.imageUrl
        };
    }
}