// Core
import { createReducer, on } from '@ngrx/store';

// Store
import * as actions from './global.actions';

// Models
import { IGlobalState } from '../..';

export const initialState: IGlobalState = {
  loaderCounter: 0,
};

export const key = 'courses';

export const reducer = createReducer(
  initialState,
  on(
    actions.addLoader, 
    (state: IGlobalState): IGlobalState => ({ ...state, loaderCounter: state.loaderCounter + 1 })
  ),
  on(
    actions.removeLoader, 
    (state: IGlobalState): IGlobalState => ({ ...state, loaderCounter: state.loaderCounter - 1 })
  ),
);