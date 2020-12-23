// Store
import { initialState as initialCourses } from 'src/app/core/store/courses/courses.reducer'
import { initialState as initialUser } from 'src/app/core/store/user/user.reducer'
import { initialState as initialGlobal } from 'src/app/core/store/global/global.reducer'

// Models
import { IAppState } from 'src/app/core';

// Mocks
import { courses, user } from 'src/app/mock';

export const initialStore: IAppState = {
  courses: initialCourses,
  user: initialUser,
  router: null,
  global: initialGlobal,
};

export const readyStore: IAppState = {
  courses: {
    entries: courses,
    itemIdToDelete: '1',
    currentItemId: '1',
    currentLoadedItem: courses[0],
    searchValue: 'search',
    loadedItems: 1,
  },
  user: {
    profile: user,
    error: 'error',
  },
  router: null,
  global: {
    loaderCounter: 2,
  },
};
