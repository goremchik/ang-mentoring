import { TestBed } from '@angular/core/testing';

import { LoggerService } from './logger.service';

describe('LoggerService', () => {
  let service: LoggerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoggerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should log error', () => {
    const spy = spyOn(console, 'error');
    const err = 'error';
    service.error(err);
    expect(spy).toHaveBeenCalledWith(err);
  });
});
