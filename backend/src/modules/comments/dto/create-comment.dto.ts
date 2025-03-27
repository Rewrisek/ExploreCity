import { IsString, IsNumber } from 'class-validator';

export class CreateCommentDto {
    @IsNumber()
    reviewId: number;

    @IsString()
    text: string;
}