// Core
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

// Services
import { AuthenticationService } from '../../services/authentication/authentication.service';

// Guards
import { AuthGuard, AUTH_URL } from './auth.guard';

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

  it('should allow redirect when logged in', () => {
    isLogin = true;
    expect(service.canActivate()).toEqual(true);
  });

  it('should redirect to auth when not logged in', () => {
    expect(service.canActivate()).toEqual(service.router.parseUrl(AUTH_URL));
  });
});
