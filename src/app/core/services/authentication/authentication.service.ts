// Core
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// Models
import { IAuth, IUser, IToken } from '../../';

// Services
import { BrowserStorageService } from '../browser-storage/browser-storage.service';

export const STORAGE_AUTH = 'token';

export const getAuthUrl = (path: string): string => `/api/auth/${path}`;
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private token: string;

  constructor(
    public storage: BrowserStorageService,
    public http: HttpClient,
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

  getUserInfo(): Observable<IUser> {
    return this.http.post<IUser>(getAuthUrl('userinfo'), { token: this.token });
  }
}
