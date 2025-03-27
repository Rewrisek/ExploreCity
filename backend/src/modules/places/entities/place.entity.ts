/* eslint-disable */
import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
    JoinColumn
} from 'typeorm';
import { City } from '../../cities/entities/city.entity';
import { Review } from '../../reviews/entities/review.entity';
import { PlaceType } from '../../../shared/enums/place-type.enum';

@Entity('places')
export class Place {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'enum', enum: PlaceType })
    type: PlaceType;

    @Column({ type: 'varchar', length: 255 })
    name: string;

    @Column({ type: 'text', nullable: true })
    description?: string;

    @Column({ type: 'varchar', length: 255 })
    address: string;

    @Column({ type: 'varchar', length: 255, nullable: true })
    image?: string;

    @Column({ type: 'decimal', precision: 3, scale: 2, default: 0 })
    averageRating: number;

    @Column({ type: 'int', default: 0 })
    totalReviews: number;

    @ManyToOne(() => City, city => city.places)
    @JoinColumn({ name: 'city_id' })
    city: City;

    @Column({ name: 'city_id' })
    cityId: number;

    @OneToMany(() => Review, review => review.place)
    reviews: Review[];
}