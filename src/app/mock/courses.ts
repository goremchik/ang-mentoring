// Models
import { ICourse } from '../core';

// TODO: will be moved to service in future tasks
const description = `
	Learn about where you can find course descriptions, what information they include,
	how they work, and details about various components of a course description.
	Course descriptions report information about a university or college's classes.
	They're published both in course catalogs that outline degree requirements and in
	course schedules that contain descriptions for all courses offered during a particular semester.
`;

export const courses: ICourse[] = [
  {
    id: '1',
    title: 'Video Course 2. Name tag 1',
    creationDate: new Date(),
    duration: 78,
    description,
  },
  {
    id: '2',
    title: 'Video Course 2. Name tag 1',
    creationDate: new Date(),
    duration: 79,
    description,
  },
  {
    id: '3',
    title: 'Video Course 2. Name tag 1',
    creationDate: new Date(),
    duration: 80,
    description,
  },
];
