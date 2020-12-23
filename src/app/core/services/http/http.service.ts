// Core
import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) { }

  get<T>(url: string, options = {}): Observable<T> {
    return this.http.get<T>(url, {
      ...options,
    });
  }

  post<T>(url: string, data?): Observable<T> {
    return this.http.post<T>(url, data);
  }

  patch<T>(url: string, data?): Observable<T> {
    return this.http.patch<T>(url, data);
  }

  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(url);
  }
}
