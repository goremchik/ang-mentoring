import { reducer, initialState } from './global.reducer';
import * as actions from './global.actions';

describe('Global reducer', () => {

  it('on addLoader', () => {
      expect(reducer(initialState, actions.addLoader()))
        .toEqual({ ...initialState, loaderCounter: 1 });
  });

  it('on removeLoader', () => {
      expect(reducer(initialState, actions.removeLoader()))
        .toEqual({ ...initialState, loaderCounter: -1 });
  });
});