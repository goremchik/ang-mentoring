// Core
import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree, ActivatedRouteSnapshot } from '@angular/router';

// Services
import { AuthenticationService } from '../../services/authentication/authentication.service';

export const LOGIN_URL = 'login';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(
    public router: Router,
    private authService: AuthenticationService,
  ) {}

  canActivate(next: ActivatedRouteSnapshot): boolean | UrlTree {
    const isLogin = next.routeConfig.path === LOGIN_URL;
    const isAuthenticated = this.authService.isAuthenticated();

    if (isAuthenticated && isLogin) {
      return this.router.parseUrl('/');
    } else if (isAuthenticated) {
      return true;
    } else if (isLogin) {
      return true;
    } else {
      return this.router.parseUrl(`/${LOGIN_URL}`);
    }
  }
}
