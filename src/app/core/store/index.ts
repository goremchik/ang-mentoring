// Core
import { ActionReducerMap } from '@ngrx/store';
import { routerReducer } from '@ngrx/router-store';

// Store
import { reducer as coursesReducer } from './courses/courses.reducer';
import { reducer as userReducer } from './user/user.reducer';
import { reducer as globalReducer } from './global/global.reducer';

// Models
import { IAppState } from '../';

export const reducers: ActionReducerMap<IAppState> = {
  courses: coursesReducer,
  user: userReducer,
  router: routerReducer,
  global: globalReducer,
};
