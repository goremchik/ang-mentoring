// Core
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { filter, tap, distinctUntilChanged } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

// Models
import { ICourse } from 'src/app/core';

// Store
import * as coursesSelectors from 'src/app/core/store/courses/courses.selectors';
import * as coursesActions from 'src/app/core/store/courses/courses.actions';

// Components
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';

// Utils
import { routeUtils, componentUtils } from 'src/app/utils';

export const MIN_SEARCH_LENGTH = 3;
export const ITEMS_TO_ADD = 5;

@Component({
  selector: 'app-courses-container',
  templateUrl: './courses-container.component.html',
  styleUrls: ['./courses-container.component.scss'],
})
export class CoursesContainerComponent implements OnInit, OnDestroy {
  courses$: Observable<ICourse[]>;
  searchValue$: Observable<string>;
  courseToRemove$: Observable<ICourse>;
  coursesCount$: Observable<number>;
  searchSubject$ = new BehaviorSubject('');
  subscriptions: Subscription[] = [];

  @ViewChild(DialogComponent) dialogChild: DialogComponent;

  constructor(
    private activatedRoute: ActivatedRoute,
    public store$: Store,
    public titleService: Title,
  ) {}

  ngOnInit(): void {
    this.courses$ = this.store$.select(coursesSelectors.getCourses);
    this.searchValue$ = this.store$.select(coursesSelectors.getSearchValue);
    this.coursesCount$ = this.store$.select(coursesSelectors.getLoadedItems);
    this.courseToRemove$ = this.store$.select(coursesSelectors.getItemToDelete);

    this.titleService.setTitle(routeUtils.getTitle(this.activatedRoute));

    this.subscriptions.push(
      this.searchSubject$
        .pipe(
          filter(str => !str || str.length >= MIN_SEARCH_LENGTH),
          distinctUntilChanged(),
          tap(searchValue =>
            this.store$.dispatch(coursesActions.setSearchValue({ searchValue }))
          )
        )
        .subscribe()
    );
  }

  ngOnDestroy() {
    componentUtils.unsubscribeAll(this.subscriptions);
  }

  onSearchChange(value): void {
    this.searchSubject$.next(value);
  }

  onDelete(itemIdToDelete: string): void {
    this.store$.dispatch(coursesActions.setItemIdToDelete({ itemIdToDelete }));
    this.dialogChild.open();
  }

  onDeleteConfirm(): void {
    this.store$.dispatch(coursesActions.removeCourse())
  }

  onLoadMore(): void {
    this.store$.dispatch(
      coursesActions.addLoadedItems({ countToAdd: ITEMS_TO_ADD })
    ) 
  }
}
