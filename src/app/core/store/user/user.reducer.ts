// Core
import { createReducer, on } from '@ngrx/store';

// Actions
import * as actions from './user.actions';

// Models
import { IUserState } from '../../';

export const initialState: IUserState = {
  profile: null,
  error: '',
};

export const key = 'user';

export const reducer = createReducer(
  initialState,
  on(
    actions.setProfile, 
    (state: IUserState, { profile }): IUserState => ({ ...state, profile })
  ),
  on(
    actions.setError, 
    (state: IUserState, { error }): IUserState => ({ ...state, error })
  ),
);