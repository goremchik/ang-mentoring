// Core
import { TestBed } from '@angular/core/testing';

// Services
import { CourseService } from './courses.service';

// Mocks
import { courses } from 'src/app/mock/courses';

// Models
import { ICourse } from '../../';

describe('CourseService', () => {
  let service: CourseService;
  const courseId = '1';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ CourseService ],
    });
    service = TestBed.inject(CourseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return courses list', () => {
    expect(service.getList()).toBe(courses);
  });

  it('should find course by id', () => {
    expect(service.getItemById(courseId)).toBe(courses[0]);
  });

  it('should remove course', () => {
    service.removeItem(courseId);
    expect(service.courses.find(({ id }) => id === courseId)).toBeFalsy();
  });

  it('should update course', () => {
    const newTitle = 'new';
    const newCourse: ICourse = {
      id: '1', title: newTitle, description: '', duration: 0, creationDate: null,
    };

    service.updateItem(newCourse);
    expect(service.getItemById('1').title).toBe(newTitle);
  });

  it('should create course', () => {
    const newCourse: ICourse = {
      id: '4', title: '', description: '', duration: 0, creationDate: null,
    };

    service.createCourse(newCourse);
    expect(service.getItemById('4')).toBe(newCourse);
  });
});
