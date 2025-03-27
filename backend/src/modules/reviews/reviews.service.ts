/* eslint-disable */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { Place } from '../places/entities/place.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { ReviewResponseDto } from './dto/review-response.dto';
import { RatingSummary } from '../../shared/interfaces/rating-summary.interface';

@Injectable()
export class ReviewsService {
    constructor(
        @InjectRepository(Review)
        private reviewRepository: Repository<Review>,
        @InjectRepository(Place)
        private placeRepository: Repository<Place>,
    ) {}

    async createReview(
        placeId: number,
        createReviewDto: CreateReviewDto
    ): Promise<ReviewResponseDto> {
        // Verify place exists
        const place = await this.placeRepository.findOne({ where: { id: placeId } });
        if (!place) {
            throw new NotFoundException('Place not found');
        }

        // Create new review
        const review = this.reviewRepository.create({
            ...createReviewDto,
            placeId
        });
        await this.reviewRepository.save(review);

        // Update place's rating
        await this.updatePlaceRating(placeId);

        return {
            id: review.id,
            rating: review.rating,
            userName: review.userName,
            createdAt: review.createdAt,
            placeId: review.placeId
        };
    }

    async getPlaceRating(placeId: number): Promise<RatingSummary> {
        // Verify place exists
        const place = await this.placeRepository.findOne({ where: { id: placeId } });
        if (!place) {
            throw new NotFoundException('Place not found');
        }

        return {
            averageRating: place.averageRating,
            totalReviews: place.totalReviews
        };
    }

    private async updatePlaceRating(placeId: number): Promise<void> {
        const reviews = await this.reviewRepository.find({
            where: { placeId }
        });

        const totalReviews = reviews.length;
        const averageRating = totalReviews > 0
            ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
            : 0;

        await this.placeRepository.update(placeId, {
            averageRating,
            totalReviews
        });
    }
}