/* eslint-disable */
import {
    IsString,
    IsNotEmpty,
    IsEnum,
    IsOptional,
    IsNumber
} from 'class-validator';
import { PlaceType } from '../../../shared/enums/place-type.enum';

export class CreatePlaceDto {
    @IsEnum(PlaceType)
    type: PlaceType;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsString()
    @IsNotEmpty()
    address: string;

    @IsOptional()
    @IsString()
    image?: string;
}