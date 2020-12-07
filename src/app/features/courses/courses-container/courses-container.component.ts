// Core
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { filter, switchMap, tap, distinctUntilChanged } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

// Models
import { ICourse } from 'src/app/core';

// Services
import { CourseService } from 'src/app/core/services/courses/courses.service';

// Components
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';

// Utils
import { routeUtils, componentUtils } from 'src/app/utils';

@Component({
  selector: 'app-courses-container',
  templateUrl: './courses-container.component.html',
  styleUrls: ['./courses-container.component.scss'],
})
export class CoursesContainerComponent implements OnInit, OnDestroy {
  courses$$: BehaviorSubject<ICourse[]>;
  searchValue = '';
  courseToRemove: ICourse;
  coursesCount = 5;
  searchSubject$ = new BehaviorSubject('');
  subscriptions: Subscription[] = [];

  @ViewChild(DialogComponent) dialogChild: DialogComponent;

  constructor(
    private activatedRoute: ActivatedRoute,
    public courseService: CourseService,
    public titleService: Title,
  ) {}

  ngOnInit(): void {
    this.courses$$ = this.courseService.subject$$;
    this.titleService.setTitle(routeUtils.getTitle(this.activatedRoute));

    this.subscriptions.push(
      this.searchSubject$
        .pipe(
          filter(str => !str || str.length >= 3),
          distinctUntilChanged(),
          tap(search => {
            this.searchValue = search;
          }),
          switchMap(this.getCourses),
        )
        .subscribe()
    );
  }

  ngOnDestroy() {
    componentUtils.unsubscribeAll(this.subscriptions);
  }

  loadCourses = (): void => {
    this.getCourses().subscribe();
  }

  getCourses = (): Observable<ICourse[]> => {
    return this.courseService
      .getList(this.searchValue, 0, this.coursesCount, 'date');
  }

  onSearchChange(value): void {
    this.searchSubject$.next(value);
  }

  prepareRemoveDialog = (course: ICourse): void => {
    this.courseToRemove = course;
    this.dialogChild.open();
  }

  onDelete(courseId: string): void {
    this.courseService.getItemById(courseId)
      .subscribe(this.prepareRemoveDialog);
  }

  onDeleteConfirm(): void {
    this.courseService.removeItem(this.courseToRemove.id)
      .subscribe(this.loadCourses);
  }

  onLoadMore(): void {
    this.coursesCount += 5;
    this.loadCourses();
  }
}
