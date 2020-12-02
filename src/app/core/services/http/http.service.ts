// Core
import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpService {
  constructor(private http: HttpClient) { }

  get<T>(url: string, options?): Observable<HttpEvent<T>> {
    return this.http.get<T>(url, options);
  }

  post<T>(url: string, options?, data?): Observable<HttpEvent<T>> {
    return this.http.post<T>(url, options, data);
  }

  patch<T>(url: string, options?, data?): Observable<HttpEvent<T>> {
    return this.http.patch<T>(url, options, data);
  }

  delete<T>(url: string, options?): Observable<HttpEvent<T>> {
    return this.http.delete<T>(url, options);
  }
}
