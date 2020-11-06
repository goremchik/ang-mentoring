import { TestBed } from '@angular/core/testing';

import { BrowserStorageService } from './browser-storage.service';

describe('BrowserStorageService', () => {
  let service: BrowserStorageService;
  const STORAGE_KEY = 'key';

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BrowserStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get item from local storage', () => {
    const spy = spyOn(localStorage, 'getItem');
    service.getItem(STORAGE_KEY);
    expect(spy).toHaveBeenCalledWith(STORAGE_KEY);
  });

  it('should set item in local storage', () => {
    const spy = spyOn(localStorage, 'setItem');
    service.setItem(STORAGE_KEY, 'value');
    expect(spy).toHaveBeenCalledWith(STORAGE_KEY, '"value"');
  });

  it('should remove item from local storage', () => {
    const spy = spyOn(localStorage, 'removeItem');
    service.removeItem(STORAGE_KEY);
    expect(spy).toHaveBeenCalledWith(STORAGE_KEY);
  });
});
