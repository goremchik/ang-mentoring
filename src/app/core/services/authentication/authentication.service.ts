// Core
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { tap, catchError, finalize } from 'rxjs/operators';

// Models
import { IAuth, IUser, IToken } from '../../';

// Services
import { BrowserStorageService } from '../browser-storage/browser-storage.service';
import { HttpService } from '../http/http.service';
import { LoggerService } from '../logger/logger.service';
import { LoaderService } from '../loader/loader.service';

export const STORAGE_AUTH = 'token';

export const getAuthUrl = (path: string): string => `/api/auth/${path}`;
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private token: string;
  public user: IUser;
  public user$: Observable<any>;
  public loading: boolean;
  public subject$$ = new BehaviorSubject<IUser>(null);

  constructor(
    public storage: BrowserStorageService,
    public http: HttpService,
    public logger: LoggerService,
    public loader: LoaderService,
  ) {
    this.token = storage.getItem(STORAGE_AUTH);
  }

  setToken = (data): void => {
    this.token = data.token;
    this.storage.setItem(STORAGE_AUTH, this.token);
    this.loader.setStatus(false);
  }

  login(authData: IAuth): Observable<IToken> {
    this.loader.setStatus(true);

    return this.http.post<IToken>(getAuthUrl('login'), authData).pipe(
      catchError(this.handleError),
      tap(this.setToken),
      tap(this.getUserInfo),
      finalize(this.resetLoader),
    );
  }

  logout(): void {
    this.storage.removeItem(STORAGE_AUTH);
    this.token = null;
    this.user = null;
    this.subject$$.next(null);
  }

  getToken(): string {
    return this.token;
  }

  setUser = (user: IUser): void => {
    this.user = user;
    this.subject$$.next(user);
    this.loading = false;
  }

  isAuthenticated(): Observable<IUser | boolean> {
    if (this.loading) {
      return this.user$;
    }
    return of(this.user);
  }

  handleError = (err: any): Observable<any> => {
    this.logger.error(err);
    this.user = null;
    this.loading = false;
    return of(null);
  }

  resetLoader = (): void => {
    this.loader.setStatus(false);
  }

  getUserInfo = (): Observable<IUser> => {
    if (!this.token) {
      return of(null);
    }

    this.loading = true;
    this.loader.setStatus(true);
    this.user$ = this.http.post<IUser>(getAuthUrl('userinfo'), { token: this.token })
    .pipe(
      catchError(this.handleError),
      tap(this.setUser),
      finalize(this.resetLoader),
    );
    return this.user$;
  }
}
