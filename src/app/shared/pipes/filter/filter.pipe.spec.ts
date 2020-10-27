// Pipes
import { FilterPipe } from './filter.pipe';

// Models
import { ICourse } from '../../../core/index';

export const courses: ICourse[] = [
  {
    id: '1',
    title: 'title 1',
    creationDate: new Date(Date.parse('2020-01-03')),
    duration: 78,
    description: 'description 1',
  },
  {
    id: '2',
    title: 'title 2',
    creationDate: new Date(Date.parse('2020-01-01')),
    duration: 79,
    description: 'description 2',
  },
];

describe('FilterPipe', () => {
  let pipe: FilterPipe;

  beforeEach(() => {
      pipe = new FilterPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return full list', () => {
    expect(pipe.transform(courses, '').length).toBe(2);
  });

  it('should find by title', () => {
    expect(pipe.transform(courses, 'Title 1')[0]).toBe(courses[0]);
  });

  it('should find by description', () => {
    expect(pipe.transform(courses, 'Description 2')[0]).toBe(courses[1]);
  });

  it('should return empty list', () => {
    expect(pipe.transform(courses, 'none').length).toBe(0);
  });
});
