// Core
import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchComponent {
  searchValue = '';
  @Output() searchChange: EventEmitter<string> = new EventEmitter<string>();

  onInput(value): void {
    this.searchValue = value;
    console.log('On input: ', this.searchValue);
  }

  onSubmit(e: Event): void {
    e.preventDefault();
    console.log('Entered value: ', this.searchValue);
    this.searchChange.emit(this.searchValue);
  }
}
