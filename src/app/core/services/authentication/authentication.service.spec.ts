// Core
import { TestBed } from '@angular/core/testing';

// Services
import { AuthenticationService, STORAGE_AUTH } from './authentication.service';
import { BrowserStorageService } from '../browser-storage/browser-storage.service';

describe('AuthenticationService', () => {
  let service: AuthenticationService;
  const STORAGE_VALUE = 'value';
  const BrowserStorageServiceStub: Partial<BrowserStorageService> = {
    getItem: () => STORAGE_VALUE,
    setItem: () => {},
    removeItem: () => {},
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
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

  it('should logout', async () => {
    const spy = spyOn(service.storage, 'removeItem');
    await service.logout();
    expect(spy).toHaveBeenCalledWith(STORAGE_AUTH);
    expect(service.isAuthenticated()).toBeFalse();
  });

  it('should logout', async () => {
    const spy = spyOn(service.storage, 'setItem');
    const loginData = { email: '1', password: '1' };
    await service.login(loginData);
    expect(spy).toHaveBeenCalledWith(STORAGE_AUTH, loginData);
    expect(service.isAuthenticated()).toBeTrue();
  });
});
