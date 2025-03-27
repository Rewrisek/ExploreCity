/* eslint-disable */
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToOne,
    JoinColumn
} from 'typeorm';
import { Place } from '../../places/entities/place.entity';
import { Comment } from '../../comments/entities/comment.entity';

@Entity('reviews')
export class Review {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'int' })
    rating: number;

    @Column({ type: 'varchar', length: 255 })
    userName: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

    @ManyToOne(() => Place, place => place.reviews)
    @JoinColumn({ name: 'place_id' })
    place: Place;

    @Column({ name: 'place_id' })
    placeId: number;

    @OneToOne(() => Comment, comment => comment.review, { nullable: true })
    comment?: Comment;
}