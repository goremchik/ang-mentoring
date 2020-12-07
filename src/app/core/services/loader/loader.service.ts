// Course
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  loaderStatus$$ = new BehaviorSubject(false);
  requestsCounter = 0;
  oldStatus = false;

  setStatus(status: boolean): void {
    if (!status && !this.requestsCounter) {
      return;
    }

    this.requestsCounter += status ? 1 : -1;
    if (!!this.requestsCounter !== this.oldStatus) {
      this.oldStatus = !!this.requestsCounter;
      this.loaderStatus$$.next(!!this.requestsCounter);
    }
  }
}
