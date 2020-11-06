// Core
import { Injectable } from '@angular/core';

// Models
import { IAuth, IUser } from '../../';

// Services
import { BrowserStorageService } from '../browser-storage/browser-storage.service';

export const STORAGE_AUTH = 'auth';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  // TODO: will be removed after using real API
  private authData: IAuth;
  private user: IUser;

  constructor(public storage: BrowserStorageService) {
    this.authData = storage.getItem(STORAGE_AUTH);
  }

  async login(authData: IAuth): Promise<IAuth> {
    this.storage.setItem(STORAGE_AUTH, authData);
    this.authData = authData;
    return authData;
  }

  async logout(): Promise<void> {
    this.storage.removeItem(STORAGE_AUTH);
    this.authData = null;
  }

  isAuthenticated(): boolean {
    return !!this.authData;
  }

  getUserInfo(): IUser {
    return this.user;
  }
}
