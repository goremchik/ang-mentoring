// Core
import { createSelector } from '@ngrx/store';

// Models
import { IUserState, IAppState, IUser } from '../..';

const getState = (state: IAppState): IUserState => state.user;

export const getUser = createSelector(
  getState,
  (state: IUserState): IUser => state.profile, 
);

export const getError = createSelector(
  getState,
  (state: IUserState): string => state.error, 
);
