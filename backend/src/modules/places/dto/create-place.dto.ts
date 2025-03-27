import { IsString, IsEnum, IsOptional, IsNumber } from 'class-validator';
import { PlaceType } from '../../../shared/enums/place-type.enum';

export class CreatePlaceDto {
    @IsEnum(PlaceType)
    type: PlaceType;

    @IsString()
    name: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsString()
    address: string;

    @IsOptional()
    @IsString()
    image?: string;

    @IsNumber()
    cityId: number;
}