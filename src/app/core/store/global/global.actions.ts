// Core
import { createAction } from '@ngrx/store';

// Store
import { types } from './global.types';

export const addLoader = createAction(types.addLoader);
export const removeLoader = createAction(types.removeLoader);
export const noAction = createAction(types.noAction);
