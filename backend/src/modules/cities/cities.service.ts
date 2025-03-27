import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from './entities/city.entity';
import { CreateCityDto } from './dto/create-city.dto';

@Injectable()
export class CitiesService {
    constructor(
        @InjectRepository(City)
        private cityRepository: Repository<City>,
    ) {}

    async create(createCityDto: CreateCityDto): Promise<City> {
        const city = this.cityRepository.create(createCityDto);
        return await this.cityRepository.save(city);
    }

    async findAll(): Promise<City[]> {
        return await this.cityRepository.find({
            order: { name: 'ASC' }
        });
    }

    async findOne(id: number): Promise<City> {
        const city = await this.cityRepository.findOne({
            where: { id },
            relations: ['places']
        });
        if (!city) {
            throw new NotFoundException(`City with ID ${id} not found`);
        }
        return city;
    }
}