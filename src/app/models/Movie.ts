import { Gender } from './Gender';
import { People } from './People';

export class Movie {
    id: number;
    title: string;
    poster_path: string;
    original_title: string;
    overview: string;
    release_date: string;
    vote_average: number;
    rating?: number;
    genders: Gender[];
    cast: People[];
}
