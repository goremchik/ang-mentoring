import * as selectors from './user.selectors';

// Mocks
import { initialStore, readyStore, user } from 'src/app/mock';

describe('User selectors', () => {
  it('getUser', () => {
    expect(selectors.getUser(initialStore)).toEqual(null);
    expect(selectors.getUser(readyStore)).toEqual(user);
  });

  it('getError', () => {
    expect(selectors.getError(initialStore)).toEqual('');
    expect(selectors.getError(readyStore)).toEqual('error');
  });
});
