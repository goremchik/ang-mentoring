// Core
import { Injectable } from '@angular/core';
import { HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// Models
import { IAuth, IUser, IToken } from '../../';

// Services
import { BrowserStorageService } from '../browser-storage/browser-storage.service';
import { HttpService } from '../http/http.service';

export const STORAGE_AUTH = 'token';

export const getAuthUrl = (path: string): string => `/api/auth/${path}`;
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private token: string;

  constructor(
    public storage: BrowserStorageService,
    public http: HttpService,
  ) {
    this.token = storage.getItem(STORAGE_AUTH);
  }

  setToken = (data): void => {
    this.token = data.token;
    this.storage.setItem(STORAGE_AUTH, this.token);
  }

  login(authData: IAuth): Observable<IToken> {
    return this.http.post<IToken>(getAuthUrl('login'), authData).pipe(
      tap(this.setToken),
    );
  }

  logout(): void {
    this.storage.removeItem(STORAGE_AUTH);
    this.token = null;
  }

  getToken(): string {
    return this.token;
  }

  isAuthenticated(): boolean {
    return !!this.token;
  }

  getUserInfo(): Observable<HttpEvent<IUser>> {
    return this.http.post<IUser>(getAuthUrl('userinfo'), { token: this.token });
  }
}
