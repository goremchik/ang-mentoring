// Core
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

// Services
import { AuthGuardService } from './auth-guard.service';
import { AuthenticationService } from '../authentication/authentication.service';

describe('AuthGuardService', () => {
  let service: AuthGuardService;
  const AuthenticationServiceStub: Partial<AuthenticationService> = {
    isAuthenticated: () => false
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      providers: [
        { provide: AuthenticationService, useValue: AuthenticationServiceStub },
    ]
    });
    service = TestBed.inject(AuthGuardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Tests will be rewritten totally, when API will be used.
  it('should redirect to login page', () => {
    const spy = spyOn(service.router, 'navigate');
    const shouldShow = service.canActivate();
    expect(spy).toHaveBeenCalledWith(['/login']);
    expect(shouldShow).toBeFalse();
  });
});
