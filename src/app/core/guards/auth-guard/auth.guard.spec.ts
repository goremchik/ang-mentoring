// Core
import { ActivatedRouteSnapshot, Router } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

// Services
import { AuthenticationService } from '../../services/authentication/authentication.service';

// Guards
import { AuthGuard, LOGIN_URL } from './auth.guard';

describe('AuthGuard', () => {
  let service: AuthGuard;
  let isLogin = false;
  const AuthenticationServiceStub: Partial<AuthenticationService> = {
    isAuthenticated: () => isLogin
  };

  beforeEach(() => {
    isLogin = false;
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      providers: [
        { provide: AuthenticationService, useValue: AuthenticationServiceStub },
    ],
    });
    service = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('/login should redirect to home page for user', () => {
    const snapshot: Partial<ActivatedRouteSnapshot> = {
      routeConfig: { path: 'login' },
    };
    isLogin = true;

    const shouldShow = service.canActivate(snapshot as ActivatedRouteSnapshot);
    expect(shouldShow).toEqual(service.router.parseUrl('/'));
  });

  it('/courses should be allowed for user', () => {
    const snapshot: Partial<ActivatedRouteSnapshot> = {
      routeConfig: { path: 'courses' },
    };
    isLogin = true;

    const shouldShow = service.canActivate(snapshot as ActivatedRouteSnapshot);
    expect(shouldShow).toBeTrue();
  });

  it('/login should be allowed for guest', () => {
    const snapshot: Partial<ActivatedRouteSnapshot> = {
      routeConfig: { path: 'login' },
    };

    const shouldShow = service.canActivate(snapshot as ActivatedRouteSnapshot);
    expect(shouldShow).toBeTrue();
  });

  it('/courses should redirect to login page for guest', () => {
    const snapshot: Partial<ActivatedRouteSnapshot> = {
      routeConfig: { path: 'courses' },
    };

    const shouldShow = service.canActivate(snapshot as ActivatedRouteSnapshot);
    expect(shouldShow).toEqual(service.router.parseUrl(`/${LOGIN_URL}`));
  });
});
