import { Component, OnInit } from '@angular/core';
import { ICourse } from '../../../core';

// TODO: will be moved to service in future tasks
const description = `
	Learn about where you can find course descriptions, what information they include,
	how they work, and details about various components of a course description.
	Course descriptions report information about a university or college's classes.
	They're published both in course catalogs that outline degree requirements and in
	course schedules that contain descriptions for all courses offered during a particular semester.
`;

const courses = [
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

@Component({
  selector: 'app-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss']
})
export class CoursesListComponent implements OnInit {
  courses: ICourse[];
  constructor() { }

  ngOnInit(): void {
    this.courses = courses;
  }

  onEdit(courseId: number): void {
    console.log('Edit course: ', courseId);
  }

  onDelete(courseId: number): void {
    console.log('Delete course: ', courseId);
  }

}
