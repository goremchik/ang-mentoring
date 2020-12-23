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

  it('should return token from storage)', () => {
    expect(service.token).toBe(STORAGE_VALUE);
  });

  it('should set token', () => {
    const spy = spyOn(service.storage, 'setItem');
    service.setToken({ token });

    expect(service.token).toBe(token);
    expect(spy).toHaveBeenCalledWith(STORAGE_AUTH, token);
  });

  it('should logout', async () => {
    const storageSpy = spyOn(service.storage, 'removeItem');
    service.logout();

    expect(storageSpy).toHaveBeenCalledWith(STORAGE_AUTH);
    expect(service.token).toBe(null);
  });

  it('getUserInfo should make request to get user data', async () => {
    const httpSpy = spyOn(service.http, 'post')
      .and.returnValue(of({ type: HttpEventType.User, ...userMock }));
    service.getUserInfo();

    expect(httpSpy).toHaveBeenCalledWith('/api/auth/userinfo', {
      token: STORAGE_VALUE
    });
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
});
