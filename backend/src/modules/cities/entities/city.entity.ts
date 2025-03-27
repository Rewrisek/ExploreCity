/* eslint-disable */
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Place } from '../../places/entities/place.entity';

@Entity('cities')
export class City {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, unique: true })
    name: string;
    @Column({ type: 'varchar', length: 255})
    imageUrl: string;

    @OneToMany(() => Place, place => place.city)
    places: Place[];
}
