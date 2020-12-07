// Core
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpEventType } from '@angular/common/http';
import { of } from 'rxjs';

// Services
import { AuthenticationService, STORAGE_AUTH } from './authentication.service';
import { BrowserStorageService } from '../browser-storage/browser-storage.service';

// Mocks
import { user as userMock } from 'src/app/mock';

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

  it('should be no authenticated', () => {
    service.isAuthenticated().subscribe(user => {
      expect(!!user).toBeFalse();
    });
  });

  it('isAuthenticated should return user request', () => {
    service.loading = true;
    service.user$ = of(userMock);
    expect(service.isAuthenticated()).toBe(service.user$);
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
    const storageSpy = spyOn(service.storage, 'removeItem');
    const subjectSpy = spyOn(service.subject$$, 'next');
    service.logout();

    expect(storageSpy).toHaveBeenCalledWith(STORAGE_AUTH);
    expect(subjectSpy).toHaveBeenCalledWith(null);
    expect(service.getToken()).toBe(null);
    expect(service.user).toBe(null);
  });

  it('getUserInfo should make request to get user data', async () => {
    const loaderSpy = spyOn(service.loader, 'setStatus');
    const httpSpy = spyOn(service.http, 'post')
      .and.returnValue(of({ type: HttpEventType.User, ...userMock }));
    service.getUserInfo();

    expect(loaderSpy).toHaveBeenCalledWith(true);
    expect(httpSpy).toHaveBeenCalledWith('/api/auth/userinfo', {
      token: STORAGE_VALUE
    });
    expect(service.loading).toBe(true);
  });

  it('handleError should log error and reset properties', async () => {
    const loggerSpy = spyOn(service.logger, 'error');
    const error = 'error';
    const err$ = service.handleError(error);

    expect(loggerSpy).toHaveBeenCalledWith(error);
    expect(service.user).toEqual(null);

    err$.subscribe(data => expect(data).toEqual(null));
  });

  it('setUser should set user data', async () => {
    const subjectSpy = spyOn(service.subject$$, 'next');
    service.setUser(userMock);

    expect(subjectSpy).toHaveBeenCalledWith(userMock);
    expect(service.loading).toBe(false);
    expect(service.user).toBe(userMock);
  });

  it('should login', async () => {
    const url = '/api/auth/login';
    const spy = spyOn(service.http, 'post').and.returnValue(
      of({ type: HttpEventType.User, token })
    );
    const loginData = { login: '1', password: '1' };
    service.login(loginData).subscribe();
    expect(spy).toHaveBeenCalledWith(url, loginData);
  });

  it('resetLoader should reset loader status', async () => {
    const loaderSpy = spyOn(service.loader, 'setStatus');
    service.resetLoader();
    expect(loaderSpy).toHaveBeenCalledWith(false);
  });
});
