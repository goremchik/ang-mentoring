// Core
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';

// Models
import { ICourse, IAuthor } from 'src/app/core';

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
export class AddCourseContainerComponent implements OnInit, OnDestroy {
  course$: Observable<ICourse>;
  courseId: string;
  authors$: Observable<IAuthor[]>;
  subscription: Subscription;

  constructor(
    public store$: Store,
    public activatedRoute: ActivatedRoute,
    public titleService: Title,
  ) {}

  ngOnInit() {
    const { snapshot: { params = {} } } = this.activatedRoute;
    this.courseId = params.id || null;
    this.store$.dispatch(
      coursesActions.loadCourseById({ id: this.courseId })
    );
    this.store$.dispatch(coursesActions.loadAuthors());

    this.course$ = this.store$.select(coursesSelectors.getCurrentItem);
    this.authors$ = this.store$.select(coursesSelectors.getAuthors);
    this.subscription = this.course$.subscribe(course => {
        const title = this.courseId
          ? course.title
          : routeUtils.getTitle(this.activatedRoute);
        this.titleService.setTitle(title);
    });
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  onFormSubmit(course: ICourse): void {
    if (this.courseId) {
      this.store$.dispatch(coursesActions.updateCourse({ course }));
    } else {
      this.store$.dispatch(coursesActions.createCourse({ course }));
    }
  }
}
