// Core
import { createAction, props } from '@ngrx/store';

// Models
import { IUser, IAuth } from '../../';

// Types
import { types } from './user.types';

export const setProfile = createAction(
  types.setProfile,
  props<{ profile: IUser }>()
);

export const loadProfile = createAction(types.loadProfile);

export const logout = createAction(types.logout);

export const login = createAction(
  types.login,
  props<IAuth>()
);

export const setError = createAction(
  types.setError,
  props<{ error: string }>()
);

