// Core
import { Injectable } from '@angular/core';
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

  canActivate(): boolean | UrlTree {
    const isAuthenticated = this.authService.isAuthenticated();

    if (!isAuthenticated) {
      return this.router.parseUrl(AUTH_URL);
    }

    return true;
  }
}
