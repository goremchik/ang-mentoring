// Core
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

// Models
import { ICourse, IAuthor } from '../../index';

// Services
import { HttpService } from '../http/http.service';

const COURSES_URL = 'api/courses/';
@Injectable({
  providedIn: 'root',
})
export class CourseService {
  constructor(public http: HttpService) {}

  mapDataToCourse = (item: any): ICourse =>
    item
      ? ({
        id: item.id.toString(),
        authors: item.authors.map(this.mapAuthor),
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

  mapAuthor = ({ id, name = '', lastName = '' }): IAuthor => ({
    id: id.toString(),
    name: name + (lastName ? ` ${lastName}` : ''),
  })

  getList(
    textFragment = '', start = 0, count = 5, sort = 'date'
  ): Observable<ICourse[]> {
    return this.http.get<ICourse[]>(COURSES_URL, {
      params: {
        textFragment,
        start: start.toString(),
        count: count.toString(),
        sort
      },
    }).pipe(map((data: any) => data.map(this.mapDataToCourse)));
  }

  createCourse(course: ICourse): Observable<any> {
    return this.http.post(COURSES_URL, this.mapCourseToData(course))
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

  getAuthors(): Observable<any> {
    return this.http.get('api/authors');
  }
}
