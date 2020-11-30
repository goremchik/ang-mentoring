// Core
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

// Services
import { AuthenticationService } from '../../services/authentication/authentication.service';

// Guards
import { LoggedGuard, ROOT_URL } from './logged.guard';

describe('LoggedGuard', () => {
  let service: LoggedGuard;
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
    service = TestBed.inject(LoggedGuard);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should redirect to root when logged in', () => {
    expect(service.canActivate()).toEqual(true);
  });

  it('should allow redirect when not logged in', () => {
    isLogin = true;
    expect(service.canActivate()).toEqual(service.router.parseUrl(ROOT_URL));
  });
});
