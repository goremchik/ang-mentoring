import { ICourse } from './course.model';
import { IAuthor } from './author.model';

export interface ICoursesState {
    entries: ICourse[],
    itemIdToDelete: string,
    currentItemId: string,
    searchValue: string,
    loadedItems: number,
    currentLoadedItem: ICourse,
    authors: IAuthor[],
}