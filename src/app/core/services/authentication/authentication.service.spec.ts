// Core
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

// Services
import { AuthenticationService, STORAGE_AUTH, getAuthUrl } from './authentication.service';
import { BrowserStorageService } from '../browser-storage/browser-storage.service';

describe('AuthenticationService', () => {
  let service: AuthenticationService;

  const token = 'token';
  const STORAGE_VALUE = 'value';
  const BrowserStorageServiceStub: Partial<BrowserStorageService> = {
    getItem: () => STORAGE_VALUE,
    setItem: () => {},
    removeItem: () => {},
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        { provide: BrowserStorageService, useValue: BrowserStorageServiceStub },
      ],
    });
    service = TestBed.inject(AuthenticationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be authenticated (have value in storage)', () => {
    expect(service.isAuthenticated()).toBeTrue();
  });

  it('should return token from storage)', () => {
    expect(service.getToken()).toBe(STORAGE_VALUE);
  });

  it('should set token', () => {
    const spy = spyOn(service.storage, 'setItem');
    service.setToken({ token });

    expect(service.getToken()).toBe(token);
    expect(spy).toHaveBeenCalledWith(STORAGE_AUTH, token);
  });

  it('should logout', async () => {
    const spy = spyOn(service.storage, 'removeItem');
    service.logout();
    expect(spy).toHaveBeenCalledWith(STORAGE_AUTH);
    expect(service.isAuthenticated()).toBeFalse();
  });

  it('should login', async () => {
    const url = '/api/auth/login';
    const spy = spyOn(service.http, 'post').and.returnValue(of({ token }));
    const loginData = { login: '1', password: '1' };
    service.login(loginData).subscribe();
    expect(spy).toHaveBeenCalledWith(url, loginData);
  });
});
