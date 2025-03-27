import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { CreateReviewDto } from './dto/create-review.dto';
import { PlacesService } from '../places/places.service';

@Injectable()
export class ReviewsService {
    constructor(
        @InjectRepository(Review)
        private reviewRepository: Repository<Review>,
        private placesService: PlacesService,
    ) {}

    async create(createReviewDto: CreateReviewDto): Promise<Review> {
        // Verify place exists
        const place = await this.placesService.findOne(createReviewDto.placeId);

        // Create review
        const review = this.reviewRepository.create({
            ...createReviewDto,
            place
        });
        const savedReview = await this.reviewRepository.save(review);

        // Update place's average rating
        await this.updatePlaceRating(place.id);

        return savedReview;
    }

    async findByPlace(placeId: number): Promise<Review[]> {
        // Verify place exists
        await this.placesService.findOne(placeId);

        return await this.reviewRepository.find({
            where: { placeId },
            order: { createdAt: 'DESC' }
        });
    }

    private async updatePlaceRating(placeId: number): Promise<void> {
        const reviews = await this.reviewRepository.find({
            where: { placeId }
        });

        const totalReviews = reviews.length;
        const averageRating = totalReviews > 0
            ? reviews.reduce((sum, r) => sum + r.rating, 0) / totalReviews
            : 0;

        await this.placesService['placeRepository'].update(placeId, {
            averageRating,
            totalReviews
        });
    }
}