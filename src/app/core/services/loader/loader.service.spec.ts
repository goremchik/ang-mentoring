import { TestBed } from '@angular/core/testing';

import { LoaderService } from './loader.service';

describe('LoaderService', () => {
  let service: LoaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoaderService);
  });

  it('setStatus should call next', () => {
    const spy = spyOn(service.loaderStatus$$, 'next');
    const status = true;
    service.setStatus(status);
    expect(spy).toHaveBeenCalledWith(status);
  });
});
