// Core
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Store } from '@ngrx/store';

// Store
import * as userSelectors from '../../store/user/user.selectors';

export const AUTH_URL = '/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    public router: Router,
    private store$: Store,
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.store$.select(userSelectors.getUser)
      .pipe(map(user => !!user ? true : this.router.parseUrl(AUTH_URL)));
  }
}
