// Core
import { createSelector } from '@ngrx/store';
import { RouterReducerState } from '@ngrx/router-store';

// Models
import { IAppState } from '../..';

const getRouter = (state: IAppState): RouterReducerState => state.router;
export const getState = (state: IAppState): any => getRouter(state).state || {};

export const getRouterRoot = createSelector(
  getState,
  (state: any): any => state.root, 
);
