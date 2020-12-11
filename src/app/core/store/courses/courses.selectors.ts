// Core
import { createSelector } from '@ngrx/store';

// Models
import { ICoursesState, IAppState, ICourse } from '../..';

const getState = (state: IAppState): ICoursesState => state.courses;

export const getCourses = createSelector(
  getState,
  (state: ICoursesState): ICourse[] => state.entries, 
);

export const getItemToDelete = createSelector(
  getState,
  (state: ICoursesState): ICourse => state.entries
    .find(entry => entry.id === state.itemIdToDelete) || null,
);

export const getCurrentItem = createSelector(
  getState,
  (state: ICoursesState): ICourse => state.entries
    .find(entry => entry.id === state.currentItemId)
    || state.currentLoadedItem,
);

export const getSearchValue = createSelector(
  getState,
  (state: ICoursesState): string => state.searchValue, 
);

export const getLoadedItems = createSelector(
  getState,
  (state: ICoursesState): number => state.loadedItems || 0, 
);

export const getItemById = createSelector(
  getCourses,
  (courses: ICourse[], id): ICourse => courses
    .find(entry => entry.id === id) || null,
);

export const getItemIdToDelete = createSelector(
  getState,
  (state: ICoursesState): string => state.itemIdToDelete,
);
