import {
    Controller,
    Post,
    Get,
    Body,
    Param,
    ParseIntPipe
} from '@nestjs/common';
import { CitiesService } from './cities.service';
import { CreateCityDto } from './dto/create-city.dto';
import { City } from './entities/city.entity';

@Controller('cities')
export class CitiesController {
    constructor(private readonly citiesService: CitiesService) {}

    @Post()
    async create(@Body() createCityDto: CreateCityDto): Promise<City> {
        return await this.citiesService.create(createCityDto);
    }

    @Get()
    async findAll(): Promise<City[]> {
        return await this.citiesService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<City> {
        return await this.citiesService.findOne(id);
    }
}