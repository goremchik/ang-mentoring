// Core
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CanActivate, Router, UrlTree } from '@angular/router';

// Services
import { AuthenticationService } from '../../services/authentication/authentication.service';

export const AUTH_URL = '/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    public router: Router,
    private authService: AuthenticationService,
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.authService.isAuthenticated().pipe(
      map(data => data ? true : this.router.parseUrl(AUTH_URL))
    );
  }
}
