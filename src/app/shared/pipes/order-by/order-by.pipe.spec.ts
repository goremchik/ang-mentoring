// Pipes
import { OrderByPipe } from './order-by.pipe';

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

describe('OrderByPipe', () => {
  let pipe: OrderByPipe;

  beforeEach(() => {
      pipe = new OrderByPipe();
  });

  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should order by creationDate desc', () => {
    const newList = pipe.transform(courses);
    expect(newList[0]).toBe(courses[0]);
    expect(newList[1]).toBe(courses[1]);
  });

  it('should order by creationDate asc', () => {
    const newList = pipe.transform(courses, 'creationDate', 'asc');
    expect(newList[0]).toBe(courses[1]);
    expect(newList[1]).toBe(courses[0]);
  });

  it('should order by title desc', () => {
    const newList = pipe.transform(courses, 'title');
    expect(newList[0]).toBe(courses[1]);
    expect(newList[1]).toBe(courses[0]);
  });

  it('should order by title asc', () => {
    const newList = pipe.transform(courses, 'title', 'asc');
    expect(newList[0]).toBe(courses[0]);
    expect(newList[1]).toBe(courses[1]);
  });
});
