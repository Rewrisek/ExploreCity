import {
    Controller,
    Post,
    Get,
    Body,
    Param,
    ParseIntPipe
} from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { CreateReviewDto } from './dto/create-review.dto';
import { Review } from './entities/review.entity';

@Controller('reviews')
export class ReviewsController {
    constructor(private readonly reviewsService: ReviewsService) {}

    @Post()
    async create(@Body() createReviewDto: CreateReviewDto): Promise<Review> {
        return await this.reviewsService.create(createReviewDto);
    }

    @Get('place/:placeId')
    async findByPlace(@Param('placeId', ParseIntPipe) placeId: number): Promise<Review[]> {
        return await this.reviewsService.findByPlace(placeId);
    }
}
