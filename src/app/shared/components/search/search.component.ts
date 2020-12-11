// Core
import { Component, Output, EventEmitter, ChangeDetectionStrategy, OnInit, OnDestroy } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

// Utils
import { componentUtils } from 'src/app/utils';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent implements OnInit, OnDestroy {
  searchValue = '';
  @Output() searchChange: EventEmitter<string> = new EventEmitter<string>();
  subject$$ = new BehaviorSubject('');
  subscriptions: Subscription[] = [];

  ngOnInit() {
    this.subscriptions.push(
      this.subject$$
        .pipe(
          debounceTime(500),
          distinctUntilChanged(),
        )
        .subscribe(search => this.searchChange.emit(search))
    );
  }

  ngOnDestroy() {
    componentUtils.unsubscribeAll(this.subscriptions);
  }

  onInput(value): void {
    this.subject$$.next(value);
    this.searchValue = value;
  }
}
