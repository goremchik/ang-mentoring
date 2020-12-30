import * as actions from './courses.actions';
import { types } from './courses.types';

import { courses, authors } from 'src/app/mock';

describe('Courses actions', () => {
  const courseId = '1';
  const search = 'search';
  const count = 1;
  const course = courses[0];

  it('loadEntries', () => {
    expect(actions.loadEntries()).toEqual({ type: types.loadEntries });
  });

  it('setEntries', () => {
    expect(actions.setEntries({ entries: courses }))
      .toEqual({ type: types.setEntries, entries: courses });
  });

  it('setItemIdToDelete', () => {
    expect(actions.setItemIdToDelete({ itemIdToDelete: courseId }))
      .toEqual({ type: types.setItemIdToDelete, itemIdToDelete: courseId });
  });

  it('setSearchValue', () => {
    expect(actions.setSearchValue({ searchValue: search }))
      .toEqual({ type: types.setSearchValue, searchValue: search });
  });

  it('addLoadedItems', () => {
    expect(actions.addLoadedItems({ countToAdd: count }))
      .toEqual({ type: types.addLoadedItems, countToAdd: count });
  });

  it('removeCourse', () => {
    expect(actions.removeCourse()).toEqual({ type: types.removeCourse });
  });

  it('loadCourseById', () => {
    expect(actions.loadCourseById({ id: courseId }))
      .toEqual({ type: types.loadCourseById, id: courseId });
  });

  it('updateCourse', () => {
    expect(actions.updateCourse({ course }))
      .toEqual({ type: types.updateCourse, course });
  });

  it('createCourse', () => {
    expect(actions.createCourse({ course }))
      .toEqual({ type: types.createCourse, course });
  });

  it('setCurrentLoadedItem', () => {
    expect(actions.setCurrentLoadedItem({ course }))
      .toEqual({ type: types.setCurrentLoadedItem, course });
  });

  it('setAuthors', () => {
    expect(actions.setAuthors({ authors }))
      .toEqual({ type: types.setAuthors, authors });
  });

  it('loadAuthors', () => {
    expect(actions.loadAuthors()).toEqual({ type: types.loadAuthors });
  });
});
