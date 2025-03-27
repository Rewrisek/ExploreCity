import { IsString, IsNumber, Min, Max } from 'class-validator';

export class CreateReviewDto {
    @IsNumber()
    placeId: number;

    @IsNumber()
    @Min(1)
    @Max(5)
    rating: number;

    @IsString()
    userName: string;
}