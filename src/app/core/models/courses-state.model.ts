import { ICourse } from './course.model';

export interface ICoursesState {
    entries: ICourse[],
    itemIdToDelete: string,
    currentItemId: string,
    searchValue: string,
    loadedItems: number,
    currentLoadedItem: ICourse,
}