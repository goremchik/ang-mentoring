// Core
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BrowserStorageService {
  getItem(key: string): any {
    const strItem = localStorage.getItem(key);
    let item = null;

    try {
      item = JSON.parse(strItem);
    } catch (e) {}

    return item;
  }

  setItem(key: string, item: any): void {
    const itemStr = JSON.stringify(item);
    localStorage.setItem(key, itemStr);
  }

  removeItem(key: string): void {
    localStorage.removeItem(key);
  }
}
