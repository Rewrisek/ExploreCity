/* eslint-disable */
import { PlaceType } from '../../../shared/enums/place-type.enum';
import { RatingSummary } from '../../../shared/interfaces/rating-summary.interface';

export class PlaceResponseDto {
    id: number;
    type: PlaceType;
    name: string;
    description?: string;
    address: string;
    image?: string;
    cityId: number;
    rating?: RatingSummary;
}