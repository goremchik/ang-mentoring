// Core
import { Injectable } from '@angular/core';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import {
  mergeMap, map, withLatestFrom, finalize, catchError, tap,
} from 'rxjs/operators';

// Store
import * as globalActions from '../global/global.actions';
import * as actions from './courses.actions';
import * as selectors from './courses.selectors';

// Services
import { CourseService } from '../../services/courses/courses.service';
import { LoggerService } from '../../services/logger/logger.service';

@Injectable()
export class CoursesEffects {
  loadCourses$ = createEffect(() => this.actions$.pipe(
    ofType(actions.loadEntries),
    withLatestFrom(
      this.store$.select(selectors.getSearchValue),
      this.store$.select(selectors.getLoadedItems),
    ),
    mergeMap(([, searchValue, loadedItems]) => {
      this.store$.dispatch(globalActions.addLoader());

      return this.coursesService.getList(searchValue, 0, loadedItems)
        .pipe(
          map(entries => actions.setEntries({ entries })),
          catchError(error =>  {
            this.logger.error(error);
            return of(actions.setEntries({ entries: [] }));
          }),
          finalize(() => this.store$.dispatch(globalActions.removeLoader())),
        );
    })
  ));

  loadMore$ = createEffect(() => this.actions$.pipe(
    ofType(actions.addLoadedItems),
    map(() => actions.loadEntries()),
  ));

  searchChanged$ = createEffect(() => this.actions$.pipe(
    ofType(actions.setSearchValue),
    map(() => actions.loadEntries()),
  ));

  removeCourse$ = createEffect(() => this.actions$.pipe(
    ofType(actions.removeCourse),
    withLatestFrom(this.store$.select(selectors.getItemIdToDelete)),
    mergeMap(([, courseId]) => {
      this.store$.dispatch(globalActions.addLoader());

      return this.coursesService.removeItem(courseId)
        .pipe(
          map(() => {
            this.store$.dispatch(actions.setItemIdToDelete({ itemIdToDelete: '' }));
            return actions.loadEntries();
          }),
          catchError(error =>  {
            this.logger.error(error);
            return of(globalActions.noAction());
          }),
          finalize(() => this.store$.dispatch(globalActions.removeLoader())),
        );
    })
  ));

  loadCourseById$ = createEffect(() => this.actions$.pipe(
    ofType(actions.loadCourseById),
    withLatestFrom(this.store$.select(selectors.getCurrentItem)),
    mergeMap(([{ id }, course]) => {
      if (!id) {
        return of(actions.setCurrentLoadedItem({ course: null }));
      }

      if (course) {
        return of(globalActions.noAction());
      }
  
      return this.coursesService.getItemById(id)
        .pipe(
          map(course => actions.setCurrentLoadedItem({ course })),
          catchError(error =>  {
            this.logger.error(error);
            return of(globalActions.noAction());
          }),
          finalize(() => this.store$.dispatch(globalActions.removeLoader())),
        )
    }),
  ));

  updateCourse$ = createEffect(() => this.actions$.pipe(
    ofType(actions.updateCourse),
    withLatestFrom(this.store$.select(selectors.getCurrentItem)),
    mergeMap(([{ course }, currentCourse]) => {
      this.store$.dispatch(globalActions.addLoader());

      return this.coursesService.updateItem({ ...currentCourse, ...course })
        .pipe(
          map(() => actions.loadEntries()),
          catchError(error =>  {
            this.logger.error(error);
            return of(globalActions.noAction());
          }),
          tap(() => this.router.navigate(['/'])),
          finalize(() => this.store$.dispatch(globalActions.removeLoader())),
        );
    })
  ));

  createCourse$ = createEffect(() => this.actions$.pipe(
    ofType(actions.createCourse),
    mergeMap(({ course }) => {
      this.store$.dispatch(globalActions.addLoader());
      return this.coursesService.createCourse({ ...course, topRated: false })
        .pipe(
          map(() => actions.loadEntries()),
          catchError(error =>  {
            this.logger.error(error);
            return of(globalActions.noAction());
          }),
          tap(() => this.router.navigate(['/'])),
          finalize(() => this.store$.dispatch(globalActions.removeLoader())),
        );
    })
  ));

  loadAuthors$ = createEffect(() => this.actions$.pipe(
    ofType(actions.loadAuthors),
    withLatestFrom(this.store$.select(selectors.getAuthors)),
    mergeMap(([_, authors]) => {
      if (authors.length) {
        return of(globalActions.noAction());
      }

      this.store$.dispatch(globalActions.addLoader());
      return this.coursesService.getAuthors()
        .pipe(
          map(authors => actions.setAuthors({ authors })),
          catchError(error =>  {
            this.logger.error(error);
            return of(globalActions.noAction());
          }),
          finalize(() => this.store$.dispatch(globalActions.removeLoader())),
        );
    })
  ));

  constructor(
    private actions$: Actions,
    private store$: Store,
    private coursesService: CourseService,
    private logger: LoggerService,
    private router: Router,
  ) { }
}