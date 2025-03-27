/* eslint-disable */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { Review } from '../reviews/entities/review.entity';
import { Place } from '../places/entities/place.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentResponseDto } from './dto/comment-response.dto';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comment)
        private commentRepository: Repository<Comment>,
        @InjectRepository(Review)
        private reviewRepository: Repository<Review>,
        @InjectRepository(Place)
        private placeRepository: Repository<Place>,
    ) {}

    async createComment(
        placeId: number,
        createCommentDto: CreateCommentDto
    ): Promise<CommentResponseDto> {
        // Find an existing review for the place
        const review = await this.reviewRepository.findOne({
            where: { placeId }
        });

        // If no review exists, create a default review
        if (!review) {
            const place = await this.placeRepository.findOne({ where: { id: placeId } });
            if (!place) {
                throw new NotFoundException('Place not found');
            }

            // Create a default review
            const defaultReview = this.reviewRepository.create({
                rating: 3, // Default neutral rating
                userName: 'Anonymous',
                placeId: place.id
            });
            await this.reviewRepository.save(defaultReview);
        }

        // Create comment
        const comment = this.commentRepository.create({
            text: createCommentDto.text,
            review: review || undefined // Use the existing review or undefined
        });
        await this.commentRepository.save(comment);

        return {
            id: comment.id,
            text: comment.text,
            createdAt: comment.createdAt,
            reviewId: comment.review?.id ?? null
        };
    }

    async getPlaceComments(placeId: number): Promise<CommentResponseDto[]> {
        // Verify place exists
        const place = await this.placeRepository.findOne({ where: { id: placeId } });
        if (!place) {
            throw new NotFoundException('Place not found');
        }

        // Find comments for the place
        const comments = await this.commentRepository
            .createQueryBuilder('comment')
            .innerJoin('comment.review', 'review')
            .where('review.placeId = :placeId', { placeId })
            .getMany();

        return comments.map(comment => ({
            id: comment.id,
            text: comment.text,
            createdAt: comment.createdAt,
            reviewId: comment.review?.id ?? null
        }));
    }
}