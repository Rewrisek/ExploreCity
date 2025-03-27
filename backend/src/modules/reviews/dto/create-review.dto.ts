/* eslint-disable */
import {
    IsString,
    IsNotEmpty,
    IsNumber,
    Min,
    Max
} from 'class-validator';

export class CreateReviewDto {
    @IsNumber()
    @Min(1)
    @Max(5)
    rating: number;

    @IsString()
    @IsNotEmpty()
    userName: string;
}