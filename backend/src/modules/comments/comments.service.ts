import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { ReviewsService } from '../reviews/reviews.service';

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comment)
        private commentRepository: Repository<Comment>,
        private reviewsService: ReviewsService,
    ) {}

    async create(createCommentDto: CreateCommentDto): Promise<Comment> {
        // Verify review exists
        const review = await this.reviewsService['reviewRepository'].findOne({
            where: { id: createCommentDto.reviewId }
        });
        if (!review) {
            throw new NotFoundException(`Review with ID ${createCommentDto.reviewId} not found`);
        }

        const comment = this.commentRepository.create({
            ...createCommentDto,
            review
        });
        return await this.commentRepository.save(comment);
    }

    async findByReview(reviewId: number): Promise<Comment | null> {
        return await this.commentRepository.findOne({
            where: { reviewId },
            relations: ['review']
        });
    }
}