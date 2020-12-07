import { IAuthors } from './authors.model';
import { from } from 'rxjs';
export interface ICourse {
    id: string;
    title: string;
    creationDate: Date;
    duration: number;
    description: string;
    topRated?: boolean;
    authors?: IAuthors[];
}
