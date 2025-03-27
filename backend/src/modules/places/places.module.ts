import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlacesService } from './places.service';
import { PlacesController } from './places.controller';
import { Place } from './entities/place.entity';
import { CitiesModule } from '../cities/cities.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Place]),
        CitiesModule
    ],
    controllers: [PlacesController],
    providers: [PlacesService],
    exports: [PlacesService]
})
export class PlacesModule {}