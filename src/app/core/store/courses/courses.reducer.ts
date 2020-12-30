// Core
import { createReducer, on } from '@ngrx/store';

// Store
import * as actions from './courses.actions';

// Models
import { ICoursesState } from '../../';

const DEFAULT_COURSES_COUNT = 5;
export const initialState: ICoursesState = {
  entries: [],
  itemIdToDelete: '',
  currentItemId: '',
  currentLoadedItem: null,
  searchValue: '',
  loadedItems: DEFAULT_COURSES_COUNT,
  authors: [],
};

export const key = 'courses';

export const reducer = createReducer(
  initialState,
  on(
    actions.setEntries, 
    (state: ICoursesState, { entries }): ICoursesState => ({
      ...state, entries
    })
  ),
  on(
    actions.setItemIdToDelete, 
    (state: ICoursesState, { itemIdToDelete }): ICoursesState => ({
      ...state, itemIdToDelete
    })
  ),
  on(
    actions.setSearchValue,
    (state: ICoursesState, { searchValue }): ICoursesState => ({ 
      ...state, searchValue, loadedItems: DEFAULT_COURSES_COUNT,
    })
  ),
  on(
    actions.addLoadedItems,
    (state: ICoursesState, { countToAdd }): ICoursesState => ({ 
      ...state, loadedItems: state.loadedItems + countToAdd ,
    })
  ),
  on(
    actions.loadCourseById,
    (state: ICoursesState, { id }): ICoursesState => ({ 
      ...state, currentItemId: id,
    })
  ),
  on(
    actions.setCurrentLoadedItem,
    (state: ICoursesState, { course }): ICoursesState => ({ 
      ...state, currentLoadedItem: course,
    })
  ),
  on(
    actions.setAuthors,
    (state: ICoursesState, { authors }): ICoursesState => ({ 
      ...state, authors,
    })
  ),
);