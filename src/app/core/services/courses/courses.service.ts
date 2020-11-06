// Core
import { Injectable } from '@angular/core';

// Models
import { ICourse } from '../../index';

// Mocks
import { courses } from 'src/app/mock/courses';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  courses: ICourse[] = courses;

  getList(): ICourse[] {
    return this.courses;
  }

  createCourse(course: ICourse): void {
    this.courses = [ ...this.courses, course ];
  }

  getItemById(courseId: string): ICourse {
    return this.courses.find(({ id }) => id === courseId);
  }

  updateItem(course: ICourse): void {
    this.removeItem(course.id);
    this.courses = [ ...this.courses, course ];
  }

  removeItem(courseId: string): void {
    this.courses = this.courses.filter(({ id }) => id !== courseId);
  }
}
