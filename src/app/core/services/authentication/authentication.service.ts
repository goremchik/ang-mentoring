// Core
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap, map } from 'rxjs/operators';

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
  public token: string;
  public loading: boolean;

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
    return this.http.post<IToken>(getAuthUrl('login'), authData)
      .pipe(tap(this.setToken));
  }

  logout(): void {
    this.storage.removeItem(STORAGE_AUTH);
    this.token = null;
  }

  getUserInfo = (): Observable<IUser> => {
    if (!this.token) {
      return of(null);
    }

    return this.http.post<IUser>(getAuthUrl('userinfo'), { token: this.token })
      .pipe(map(user => user));
  }
}
