import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchValue: string;

  constructor() { }

  ngOnInit(): void {
  }

  onInput(value) {
    this.searchValue = value;
    console.log('On input ', this.searchValue);
  }

  onSubmit(e: Event) {
    e.preventDefault();
    console.log('Entered value: ', this.searchValue);
    this.searchValue = '';
  }
}
