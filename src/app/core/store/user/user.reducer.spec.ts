import { reducer, initialState } from './user.reducer';
import * as actions from './user.actions';

// Mocks
import { user } from 'src/app/mock';

describe('Courses reducer', () => {
  const error = 'error';

  it('on setProfile', () => {
      expect(reducer(initialState, actions.setProfile({ profile: user })))
        .toEqual({ ...initialState, profile: user });
  });

  it('on setError', () => {
      expect(reducer(initialState, actions.setError({ error })))
        .toEqual({ ...initialState, error });
  });
});
