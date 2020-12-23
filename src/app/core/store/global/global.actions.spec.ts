import * as actions from './global.actions';
import { types } from './global.types';

describe('Global actions', () => {
  it('addLoader', () => {
    expect(actions.addLoader()).toEqual({ type: types.addLoader });
  });

  it('removeLoader', () => {
    expect(actions.removeLoader()).toEqual({ type: types.removeLoader });
  });

  it('noAction', () => {
    expect(actions.noAction()).toEqual({ type: types.noAction });
  });
});
