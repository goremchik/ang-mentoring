// Core
import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent {
  form: FormGroup;
  @Output() searchChange: EventEmitter<string> = new EventEmitter<string>();

  constructor(public formBuilder: FormBuilder) {
    this.form = this.formBuilder.group({
      search: ['', Validators.minLength(3)],
    })
  }

  onSubmit(): void {
    this.searchChange.emit(this.getField('search').value);
  }

  getField(fieldName: string): AbstractControl {
    return this.form.get(fieldName);
  }
}
