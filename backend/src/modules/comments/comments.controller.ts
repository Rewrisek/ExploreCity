import {
    Controller,
    Post,
    Get,
    Body,
    Param,
    ParseIntPipe
} from '@nestjs/common';
import { CommentsService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';

@Controller('comments')
export class CommentsController {
    constructor(private readonly commentsService: CommentsService) {}

    @Post()
    async create(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
        return await this.commentsService.create(createCommentDto);
    }

    @Get('review/:reviewId')
    async findByReview(@Param('reviewId', ParseIntPipe) reviewId: number): Promise<Comment | null> {
        return await this.commentsService.findByReview(reviewId);
    }
}