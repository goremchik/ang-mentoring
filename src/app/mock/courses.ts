// Models
import { ICourse } from '../core';

// Utils
import { dateUtils } from '../utils';

// TODO: will be moved to service in future tasks
const description = `
	Learn about where you can find course descriptions, what information they include,
	how they work, and details about various components of a course description.
	Course descriptions report information about a university or college's classes.
	They're published both in course catalogs that outline degree requirements and in
	course schedules that contain descriptions for all courses offered during a particular semester.
`;

const currDate = new Date();
export const courses: ICourse[] = [
  {
    id: '1',
    title: 'Video Course 1',
    creationDate: currDate,
    duration: 78,
    description: description + 'description 1',
    topRated: true,
    authors: [{ id: 1, name: 'test', lastName: 'last'}],
  },
  {
    id: '2',
    title: 'Video Course 2',
    creationDate: dateUtils.shiftDate(currDate, { daysShift: 1 }),
    duration: 79,
    description: description + 'description 2',
    authors: [{ id: 1, name: 'test', lastName: 'last'}],
  },
  {
    id: '3',
    title: 'Video Course 3',
    creationDate: dateUtils.shiftDate(currDate, { daysShift: -15 }),
    duration: 80,
    description: description + 'description 3',
    authors: [{ id: 1, name: 'test', lastName: 'last'}],
  },
];
