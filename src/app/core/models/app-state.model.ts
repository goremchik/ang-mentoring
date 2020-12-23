// Core
import { RouterReducerState } from '@ngrx/router-store';

// Models
import { ICoursesState } from './courses-state.model';
import { IUserState } from './user-state.model';
import { IGlobalState } from './global-state.model';

export interface IAppState {
    courses: ICoursesState,
    user: IUserState,
    router: RouterReducerState,
    global: IGlobalState,
}