// Core
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';
import { mergeMap, map, tap, catchError, switchMap, finalize } from 'rxjs/operators';

// Store
import * as actions from './user.actions';
import * as globalActions from '../global/global.actions';

// Services
import { AuthenticationService } from '../../services/authentication/authentication.service';
import { LoggerService } from '../../services/logger/logger.service';

@Injectable()
export class UserEffects {
  loadProfile$ = createEffect(() => 
    this.actions$.pipe(
      ofType(actions.loadProfile),
      mergeMap(() => {
        this.store$.dispatch(globalActions.addLoader());

        return this.authService.getUserInfo()
          .pipe(
            map(profile => actions.setProfile({ profile })),
            tap(() => this.router.navigate(['/'])),
            catchError(error =>  {
              this.logger.error(error);
              return of(actions.setProfile({ profile: null }));
            }),
            finalize(() => this.store$.dispatch(globalActions.removeLoader())),
          );
      })
    )
  );

  logout$ = createEffect(() => 
    this.actions$.pipe(
      ofType(actions.logout),
      tap(() => this.authService.logout()),
      map(() => actions.setProfile({ profile: null })),
      tap(() => this.router.navigate(['/auth'])),
    ),
  );

  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(actions.login),
      switchMap(payload => {
        this.store$.dispatch(globalActions.addLoader());

        return this.authService.login(payload)
          .pipe(
            map(() => actions.loadProfile()),
            catchError(error => of(actions.setError(error))),
            finalize(() => this.store$.dispatch(globalActions.removeLoader())),
          )
      })
    );
  });

  constructor(
    private actions$: Actions,
    private authService: AuthenticationService,
    private logger: LoggerService,
    private store$: Store,
    private router: Router,
  ) { }
}