import {
    Controller,
    Post,
    Get,
    Body,
    Param,
    ParseIntPipe
} from '@nestjs/common';
import { PlacesService } from './places.service';
import { CreatePlaceDto } from './dto/create-place.dto';
import { Place } from './entities/place.entity';

@Controller('places')
export class PlacesController {
    constructor(private readonly placesService: PlacesService) {}

    @Post()
    async create(@Body() createPlaceDto: CreatePlaceDto): Promise<Place> {
        return await this.placesService.create(createPlaceDto);
    }

    @Get('city/:cityId')
    async findByCity(@Param('cityId', ParseIntPipe) cityId: number): Promise<Place[]> {
        return await this.placesService.findByCity(cityId);
    }

    @Get(':id')
    async findOne(@Param('id', ParseIntPipe) id: number): Promise<Place> {
        return await this.placesService.findOne(id);
    }
}