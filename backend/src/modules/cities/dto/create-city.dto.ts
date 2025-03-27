/* eslint-disable */
import { IsString, IsNotEmpty, MinLength } from 'class-validator';

export class CreateCityDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    name: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    imageUrl: string;
}