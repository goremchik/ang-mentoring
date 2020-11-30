// Core
import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController, } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

// Interceptors
import { AuthInterceptor } from './auth.interceptor';

// Services
import { AuthenticationService } from '../services/authentication/authentication.service';

describe('AuthInterceptor', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let token = '';

  const API_URL = '/api/test';
  const AuthenticationServiceStub: Partial<AuthenticationService> = {
    getToken: () => token,
  };

  beforeEach(() => {
    token = '';
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [
        HttpClient,
        { provide: AuthenticationService, useValue: AuthenticationServiceStub },
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
