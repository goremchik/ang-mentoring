// Core
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

// Interceptors
import { AuthInterceptor } from './auth.interceptor';

// Services
import { BrowserStorageService } from '../services/browser-storage/browser-storage.service';

describe('AuthInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let token = '';

  const API_URL = '/api/test';
  const BrowserStorageServiceStub: Partial<BrowserStorageService> = {
    getItem: () => token,
  };

  beforeEach(() => {
    token = '';
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        HttpClient,
        { provide: BrowserStorageService, useValue: BrowserStorageServiceStub },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true, },
      ],
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should add auth header', async () => {
    token = 'token';
    http.get(API_URL).subscribe();
    const httpRequest = httpMock.expectOne(API_URL);
    expect(httpRequest.request.headers.get('Authorization')).toBe(token);
  });

  it('should not add auth header', async () => {
    http.get(API_URL).subscribe();
    const httpRequest = httpMock.expectOne(API_URL);
    expect(httpRequest.request.headers.get('Authorization')).toBe(null);
  });
});
