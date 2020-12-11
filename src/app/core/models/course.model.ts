import { IAuthors } from './authors.model';

export interface ICourse {
    id: string;
    title: string;
    creationDate: Date;
    duration: number;
    description: string;
    topRated?: boolean;
    authors?: IAuthors[];
}
