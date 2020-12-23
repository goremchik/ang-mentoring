import * as actions from './user.actions';
import { types } from './user.types';

import { user, auth } from 'src/app/mock';

describe('User actions', () => {
  const error = 'error';
  it('setProfile', () => {
    expect(actions.setProfile({ profile: user }))
      .toEqual({ type: types.setProfile, profile: user });
  });

  it('loadProfile', () => {
    expect(actions.loadProfile()).toEqual({ type: types.loadProfile });
  });

  it('logout', () => {
    expect(actions.logout()).toEqual({ type: types.logout });
  });

  it('login', () => {
    expect(actions.login(auth))
      .toEqual({ type: types.login, ...auth });
  });

  it('setError', () => {
    expect(actions.setError({ error }))
      .toEqual({ type: types.setError, error });
  });
});
