import { reducer, initialState } from './courses.reducer';
import * as actions from './courses.actions';

// Mocks
import { courses, authors } from 'src/app/mock';

describe('Courses reducer', () => {
  const courseId = '1';
  const search = 'search';
  const course = courses[0];

  it('on setEntries', () => {
      expect(reducer(initialState, actions.setEntries({ entries: courses })))
        .toEqual({ ...initialState, entries: courses });
  });

  it('on setItemIdToDelete', () => {
      expect(
        reducer(initialState, actions.setItemIdToDelete({ itemIdToDelete: courseId }))
      )
        .toEqual({ ...initialState, itemIdToDelete: courseId });
  });

  it('on setSearchValue', () => {
      expect(reducer(initialState, actions.setSearchValue({ searchValue: search })))
        .toEqual({ ...initialState, searchValue: search });
  });

  it('on addLoadedItems', () => {
      expect(reducer(initialState, actions.addLoadedItems({ countToAdd: 1 })))
        .toEqual({ ...initialState, loadedItems: 6 });
  });

  it('on loadCourseById', () => {
      expect(reducer(initialState, actions.loadCourseById({ id: courseId })))
        .toEqual({ ...initialState, currentItemId: courseId });
  });

  it('on setCurrentLoadedItem', () => {
      expect(reducer(initialState, actions.setCurrentLoadedItem({ course })))
        .toEqual({ ...initialState, currentLoadedItem: course });
  });

  it('on setAuthors', () => {
      expect(reducer(initialState, actions.setAuthors({ authors })))
        .toEqual({ ...initialState, authors });
  });
});
