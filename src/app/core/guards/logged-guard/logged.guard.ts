// Core
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CanActivate, Router, UrlTree } from '@angular/router';

// Services
import { AuthenticationService } from '../../services/authentication/authentication.service';

export const ROOT_URL = '/';

@Injectable({
  providedIn: 'root',
})
export class LoggedGuard implements CanActivate {
  constructor(
    public router: Router,
    private authService: AuthenticationService,
  ) {}

  canActivate(): Observable<boolean | UrlTree>  {
    return this.authService.isAuthenticated().pipe(
      map(data => data ? this.router.parseUrl(ROOT_URL) : true)
    );
  }
}
