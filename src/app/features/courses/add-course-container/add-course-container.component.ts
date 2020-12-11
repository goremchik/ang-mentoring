// Core
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

// Models
import { ICourse } from 'src/app/core';

// Store
import * as coursesSelectors from 'src/app/core/store/courses/courses.selectors';
import * as coursesActions from 'src/app/core/store/courses/courses.actions';

// Utils
import { routeUtils } from 'src/app/utils';

@Component({
  selector: 'app-add-course-container',
  templateUrl: './add-course-container.component.html',
  styleUrls: ['./add-course-container.component.scss']
})
export class AddCourseContainerComponent implements OnInit {
  course$: Observable<ICourse>;
  courseId: string;

  constructor(
    public store$: Store,
    public activatedRoute: ActivatedRoute,
    public titleService: Title,
  ) {}

  ngOnInit() {
    const { snapshot: { params = {} } } = this.activatedRoute;
    this.courseId = params.id;
    if (this.courseId) {
      this.store$.dispatch(
        coursesActions.loadCourseById({ id: this.courseId })
      );
    }

    this.course$ = this.store$.select(coursesSelectors.getCurrentItem);
    this.course$.subscribe(course => {
        const title = this.courseId
          ? course.title
          : routeUtils.getTitle(this.activatedRoute);
        this.titleService.setTitle(title);
    });
  }

  onFormSubmit(courseBareData: any): void {
    const course: ICourse = {
      id: this.courseId || null,
      title: courseBareData.title,
      description: courseBareData.description,
      duration: +courseBareData.duration,
      creationDate: new Date(courseBareData.creationDate),
      authors: courseBareData.authors,
    };

    if (this.courseId) {
      this.store$.dispatch(coursesActions.updateCourse({ course }));
    } else {
      this.store$.dispatch(coursesActions.createCourse({ course }));
    }
  }
}
