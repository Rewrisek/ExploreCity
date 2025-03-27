/* eslint-disable */
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    OneToOne,
    JoinColumn
} from 'typeorm';
import { Review } from '../../reviews/entities/review.entity';

@Entity('comments')
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    text: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @OneToOne(() => Review, review => review.comment)
    @JoinColumn({ name: 'review_id' })
    review: Review;

    @Column({ name: 'review_id' })
    reviewId: number;
}