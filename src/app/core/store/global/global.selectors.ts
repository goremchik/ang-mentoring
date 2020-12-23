// Core
import { createSelector } from '@ngrx/store';

// Models
import { IGlobalState, IAppState } from '../..';

const getState = (state: IAppState): IGlobalState => state.global;

export const getLoaderStatus = createSelector(
  getState,
  (state: IGlobalState): boolean => !!state.loaderCounter, 
);