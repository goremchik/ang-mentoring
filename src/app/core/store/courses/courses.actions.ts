// Core
import { createAction, props } from '@ngrx/store';

// Models
import { ICourse } from '../../';

// Store
import { types } from './courses.types';

export const loadEntries = createAction(types.loadEntries);

export const setEntries = createAction(
  types.setEntries, 
  props<{ entries: ICourse[] }>(),
);

export const setItemIdToDelete = createAction(
  types.setItemIdToDelete, 
  props<{ itemIdToDelete: string }>(),
);

export const setSearchValue = createAction(
  types.setSearchValue, 
  props<{ searchValue: string }>(),
);

export const addLoadedItems = createAction(
  types.addLoadedItems, 
  props<{ countToAdd: number }>(),
);

export const removeCourse = createAction(types.removeCourse);

export const loadCourseById = createAction(
  types.loadCourseById,
  props<{ id: string }>(),
);

export const updateCourse = createAction(
  types.updateCourse,
  props<{ course: ICourse }>(),
);

export const createCourse = createAction(
  types.createCourse,
  props<{ course: ICourse }>(),
);

export const setCurrentLoadedItem = createAction(
  types.setCurrentLoadedItem,
  props<{ course: ICourse }>(),
);
