import * as selectors from './courses.selectors';

// Mocks
import { initialStore, readyStore, courses } from 'src/app/mock';

describe('Courses selectors', () => {
  it('getCourses', () => {
      expect(selectors.getCourses(initialStore)).toEqual([]);
      expect(selectors.getCourses(readyStore)).toEqual(courses);
  });

  it('getItemToDelete', () => {
      expect(selectors.getItemToDelete(initialStore)).toEqual(null);
      expect(selectors.getItemToDelete(readyStore)).toEqual(courses[0]);
  });

  it('getCurrentItem', () => {
      expect(selectors.getCurrentItem(initialStore)).toEqual(null);
      expect(selectors.getCurrentItem(readyStore)).toEqual(courses[0]);
  });

  it('getSearchValue', () => {
      expect(selectors.getSearchValue(initialStore)).toEqual('');
      expect(selectors.getSearchValue(readyStore)).toEqual('search');
  });

  it('getLoadedItems', () => {
      expect(selectors.getLoadedItems(initialStore)).toEqual(5);
      expect(selectors.getLoadedItems(readyStore)).toEqual(1);
  });

  it('getItemById', () => {
      expect(selectors.getItemById(initialStore, null)).toEqual(null);
      expect(selectors.getItemById(readyStore, '1')).toEqual(courses[0]);
  });

  it('getItemIdToDelete', () => {
      expect(selectors.getItemIdToDelete(initialStore)).toEqual('');
      expect(selectors.getItemIdToDelete(readyStore)).toEqual('1');
  });
});
