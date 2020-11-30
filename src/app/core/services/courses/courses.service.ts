// Core
import { Injectable, InjectionToken } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Models
import { ICourse } from '../../index';

// Mocks
import { courses } from 'src/app/mock/courses';

export const COURSES_SERVICE_TOKEN = new InjectionToken<string>('CourseService');

const COURSES_URL = 'api/courses/';
@Injectable()
export class CourseService {
  courses: ICourse[] = courses;

  constructor(
    public http: HttpClient,
  ) {}

  mapDataToCourse = (item: any): ICourse => ({
    id: item.id.toString(),
    authors: item.authors,
    creationDate: new Date(item.date),
    description: item.description,
    topRated: item.isTopRated,
    title: item.name,
    duration: item.length,
  })

  mapCourseToData = (item: any): object => {
    const obj = {
      authors: item.authors,
      date: item.creationDate.toISOString(),
      isTopRated: item.topRated,
      name: item.title,
      length: item.duration,
      description: item.description
    };

    if (item.id) {
      return { id: +item.id, ...obj };
    }

    return obj;
  }

  getList(
    textFragment = '', start = 0, count = 5, sort = ''
  ): Observable<ICourse[]> {
    return this.http.get<ICourse[]> (COURSES_URL, {
      params: {
        textFragment,
        start: start.toString(),
        count: count.toString(),
        sort
      },
    }).pipe(map((data: any) => data.map(this.mapDataToCourse)));
  }

  createCourse(course: ICourse): Observable<any> {
    return this.http.post(COURSES_URL, this.mapCourseToData(course));
  }

  getItemById(courseId: string): Observable<ICourse> {
    return this.http.get<ICourse>(`${COURSES_URL}${courseId}`)
    .pipe(map(this.mapDataToCourse));
  }

  updateItem(course: ICourse): Observable<any> {
    return this.http.patch(
      `${COURSES_URL}${course.id}`,
      this.mapCourseToData(course),
    );
  }

  removeItem(courseId: string): Observable<any> {
    return this.http.delete(`${COURSES_URL}${courseId}`);
  }
}
