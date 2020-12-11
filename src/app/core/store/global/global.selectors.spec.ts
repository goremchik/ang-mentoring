import * as selectors from './global.selectors';

// Mocks
import { initialStore, readyStore } from 'src/app/mock';

describe('Global selectors', () => {
  it('getLoaderStatus', () => {
    expect(selectors.getLoaderStatus(initialStore)).toEqual(false);
    expect(selectors.getLoaderStatus(readyStore)).toEqual(true);
  });
});
