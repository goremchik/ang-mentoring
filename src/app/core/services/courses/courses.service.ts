// Core
import { Injectable, InjectionToken } from '@angular/core';
import { Observable, ObservableInput, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

// Models
import { ICourse } from '../../index';

// Services
import { HttpService } from '../http/http.service';
import { LoggerService } from '../logger/logger.service';

export const COURSES_SERVICE_TOKEN = new InjectionToken<string>('CourseService');

const COURSES_URL = 'api/courses/';
@Injectable()
export class CourseService {
  constructor(
    public http: HttpService,
    public logger: LoggerService,
  ) {}

  mapDataToCourse = (item: any): ICourse =>
    item
      ? ({
        id: item.id.toString(),
        authors: item.authors,
        creationDate: new Date(item.date),
        description: item.description,
        topRated: item.isTopRated,
        title: item.name,
        duration: item.length,
      })
      : null

  mapCourseToData = (item: any): object => {
    if (!item) {
      return null;
    }

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

  handleError(err: any): Observable<any> {
    this.logger.error(err);
    return of(null);
  }

  handleArrayError(err: any): Observable<any> {
    this.logger.error(err);
    return of([]);
  }

  getList(
    textFragment = '', start = 0, count = 5, sort = ''
  ): Observable<ICourse[]> {
    return this.http.get<ICourse[]>(COURSES_URL, {
      params: {
        textFragment,
        start: start.toString(),
        count: count.toString(),
        sort
      },
    }).pipe(
      catchError(this.handleArrayError),
      map((data: any) => data.map(this.mapDataToCourse))
    );
  }

  createCourse(course: ICourse): Observable<any> {
    return this.http.post(COURSES_URL, this.mapCourseToData(course))
      .pipe( catchError(this.handleError) );
  }

  getItemById(courseId: string): Observable<ICourse> {
    return this.http.get<ICourse>(`${COURSES_URL}${courseId}`)
      .pipe(
        catchError(this.handleError),
        map(this.mapDataToCourse)
      );
  }

  updateItem(course: ICourse): Observable<any> {
    return this.http.patch(
      `${COURSES_URL}${course.id}`,
      this.mapCourseToData(course),
    ).pipe( catchError(this.handleError) );
  }

  removeItem(courseId: string): Observable<any> {
    return this.http.delete(`${COURSES_URL}${courseId}`)
      .pipe( catchError(this.handleError) );
  }
}
