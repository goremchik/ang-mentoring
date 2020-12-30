// Core
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpEventType } from '@angular/common/http';
import { of } from 'rxjs';

// Services
import { CourseService } from './courses.service';
import { HttpService } from '../http/http.service';

// Mocks
import { courses, authors } from 'src/app/mock';

// Models
import { ICourse } from '../../';

describe('CourseService', () => {
  let service: CourseService;
  const courseId = '1';
  const date = new Date();
  const courseBare = {
    description: 'description',
    duration: 0,
    creationDate: date,
    authors: [],
    isTopRated: false,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ CourseService, HttpService ],
    });
    service = TestBed.inject(CourseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getList should make request to get list', () => {
    const spy = spyOn(service.http, 'get').and.returnValue(
      of({ type: HttpEventType.User, courses })
    );
    service.getList();
    expect(spy).toHaveBeenCalledWith('api/courses/', {
      params: { textFragment: '', start: '0', count: '5', sort: 'date' },
    });
  });

  it('getItemById should make request to get course', () => {
    const spy = spyOn(service.http, 'get').and.returnValue(of(null));
    service.getItemById(courseId);
    expect(spy).toHaveBeenCalledWith(`api/courses/${courseId}`);
  });

  it('removeItem should make request to remove course', () => {
    const spy = spyOn(service.http, 'delete').and.returnValue(of(null));
    service.removeItem(courseId);
    expect(spy).toHaveBeenCalledWith(`api/courses/${courseId}`);
  });

  it('updateItem should make request to update course', () => {
    const newTitle = 'new';
    const newCourse: ICourse = { id: courseId, title: newTitle, ...courseBare };
    const spy = spyOn(service.http, 'patch').and.returnValue(of(null));
    service.updateItem(newCourse);

    expect(spy).toHaveBeenCalledWith(
      `api/courses/${courseId}`,
      service.mapCourseToData(newCourse)
    );
  });

  it('createCourse should make request to create course', () => {
    const newCourse: ICourse = { id: null, title: 'title', ...courseBare };

    const spy = spyOn(service.http, 'post').and.returnValue(of(null));
    service.createCourse(newCourse);

    expect(spy).toHaveBeenCalledWith(
      'api/courses/',
      service.mapCourseToData(newCourse)
    );
  });

  it('getAuthors should make request to get authors list', () => {
    const spy = spyOn(service.http, 'get').and.returnValue(of(null));
    service.getAuthors();

    expect(spy).toHaveBeenCalledWith('api/authors');
  });

  const courseData: ICourse = {
    id: '1',
    authors: [],
    topRated: false,
    title: 'title',
    description: 'description',
    duration: 0,
    creationDate: new Date(0),
  };

  const serverData = {
    id: 1,
    authors: [],
    isTopRated: false,
    name: 'title',
    description: 'description',
    length: 0,
    date: '1970-01-01T00:00:00.000Z',
  };

  it('mapCourseToData should convert course to request data', () => {
    expect(service.mapCourseToData(courseData)).toEqual(serverData);
  });

  it('mapDataToCourse should convert request data to course', () => {
    expect(service.mapDataToCourse(serverData)).toEqual(courseData);
  });

  it('mapAuthor should map author name and transform id to string', () => {
    expect(service.mapAuthor({ id: 1, name: 'name', lastName: 'last' }))
      .toEqual(authors[0]);
  });
});
