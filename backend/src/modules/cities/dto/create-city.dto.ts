import {IsOptional, IsString, IsUrl, MinLength} from 'class-validator';

export class CreateCityDto {
    @IsString()
    @MinLength(2)
    name: string;

    @IsOptional()
    @IsUrl()
    @IsString()
    imageUrl?: string;
}