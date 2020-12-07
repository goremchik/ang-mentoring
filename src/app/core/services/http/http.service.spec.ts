// Core
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

// Services
import { HttpService } from './http.service';

describe('HttpService', () => {
  let service: HttpService;
  const URL = '/url';
  const data = {};

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
    });
    service = TestBed.inject(HttpService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('get should make get request', () => {
    const spy = spyOn(service, 'get').and.returnValue(of(null));
    service.get(URL);
    expect(spy).toHaveBeenCalledWith(URL);
  });

  it('post should make post request', () => {
    const spy = spyOn(service, 'post').and.returnValue(of(null));
    service.post(URL, data);
    expect(spy).toHaveBeenCalledWith(URL, data);
  });

  it('patch should make patch request', () => {
    const spy = spyOn(service, 'patch').and.returnValue(of(null));
    service.patch(URL, data);
    expect(spy).toHaveBeenCalledWith(URL, data);
  });

  it('delete should make delete request', () => {
    const spy = spyOn(service, 'delete').and.returnValue(of(null));
    service.delete(URL);
    expect(spy).toHaveBeenCalledWith(URL);
  });
});
