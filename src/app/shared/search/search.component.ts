import { Component } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent {
  searchValue: string;

  onInput(value): void {
    this.searchValue = value;
    console.log('On input ', this.searchValue);
  }

  onSubmit(e: Event): void {
    e.preventDefault();
    console.log('Entered value: ', this.searchValue);
    this.searchValue = '';
  }
}
