import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Place } from '../../places/entities/place.entity';
import { IsString, MinLength, IsOptional, IsUrl } from 'class-validator';

@Entity('cities')
export class City {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar', length: 255, unique: true })
    name: string;

    @Column({ type: 'varchar', length: 500, nullable: true })
    imageUrl: string;

    @OneToMany(() => Place, place => place.city)
    places: Place[];
}

