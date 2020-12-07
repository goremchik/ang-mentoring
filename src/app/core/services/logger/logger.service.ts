import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  error(error: any): void {
    console.error(error);
  }
}
