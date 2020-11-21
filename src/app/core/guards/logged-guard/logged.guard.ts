// Core
import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';

// Services
import { AuthenticationService } from '../../services/authentication/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class LoggedGuard implements CanActivate {
  constructor(
    public router: Router,
    private authService: AuthenticationService,
  ) {}

  canActivate(): boolean | UrlTree {
    const isAuthenticated = this.authService.isAuthenticated();

    if (isAuthenticated) {
      return this.router.parseUrl('/');
    }

    return true;
  }
}
