// Core
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpEvent, HttpHandler } from '@angular/common/http';
import { Observable } from 'rxjs';

// Services
import { STORAGE_AUTH } from '../services/authentication/authentication.service';
import { BrowserStorageService } from '../services/browser-storage/browser-storage.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
constructor(
    private storage: BrowserStorageService,
) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Use here storage service, but not authentication, because I have cyclic dependency
    const token = this.storage.getItem(STORAGE_AUTH);
    const authReq = token ? req.clone({
        setHeaders: {
          Authorization: token,
        }
    }) : req;

    return next.handle(authReq);
  }
}
