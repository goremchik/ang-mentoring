// Core
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Store, select } from '@ngrx/store';

// Store
import * as userSelectors from '../../store/user/user.selectors';

export const ROOT_URL = '/';

@Injectable({
  providedIn: 'root',
})
export class LoggedGuard implements CanActivate {
  constructor(
    public router: Router,
    private store$: Store,
  ) {}

  canActivate(): Observable<boolean | UrlTree>  {
    return this.store$.pipe(
      select(userSelectors.getUser),
      map(data => !!data ? this.router.parseUrl(ROOT_URL) : true)
    );
  }
}
