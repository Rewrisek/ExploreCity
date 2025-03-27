/* eslint-disable */
import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    ParseIntPipe
} from '@nestjs/common';
import { PlacesService } from './places.service';
import { ReviewsService } from '../reviews/reviews.service';
import { CommentsService } from '../comments/comments.service';
import { CreateReviewDto } from '../reviews/dto/create-review.dto';
import { CreateCommentDto } from '../comments/dto/create-comment.dto';

@Controller('places')
export class PlacesController {
    constructor(
        private readonly placesService: PlacesService,
        private readonly reviewsService: ReviewsService,
        private readonly commentsService: CommentsService
    ) {}

    @Get('types')
    async getPlaceTypes() {
        return this.placesService.getPlaceTypes();
    }

    @Get('place/:id')
    async getPlace(@Param('id', ParseIntPipe) placeId: number) {
        return this.placesService.findOnePlace(placeId);
    }

    @Get('place/:id/comments')
    async getPlaceComments(@Param('id', ParseIntPipe) placeId: number) {
        return this.commentsService.getPlaceComments(placeId);
    }

    @Post('place/:id/comments')
    async createComment(
        @Param('id', ParseIntPipe) placeId: number,
        @Body() createCommentDto: CreateCommentDto
    ) {
        return this.commentsService.createComment(placeId, createCommentDto);
    }

    @Get('place/:id/rating')
    async getPlaceRating(@Param('id', ParseIntPipe) placeId: number) {
        return this.reviewsService.getPlaceRating(placeId);
    }

    @Post('place/:id/rating')
    async createReview(
        @Param('id', ParseIntPipe) placeId: number,
        @Body() createReviewDto: CreateReviewDto
    ) {
        return this.reviewsService.createReview(placeId, createReviewDto);
    }
}