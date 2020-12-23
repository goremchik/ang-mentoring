// Core
import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [     
    {
      provide: NG_VALUE_ACCESSOR, 
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true     
    },
  ],
})
export class DatePickerComponent implements ControlValueAccessor {
  @Input() placeholder = '';
  @Input() invalid = false;
  @Input() format = 'MM/dd/yyyy';
  @Input() formaReg = /^(?<month>\d\d)\/(?<day>\d\d)\/(?<year>\d\d\d\d)$/;

  value: Date;
  disabled = false;

  onChanged: any = () => {}
  onTouched: any = () => {}

  writeValue(val: Date) {
    this.value = val;
  }

  registerOnChange(fn: any){
    this.onChanged = fn
  }

  registerOnTouched(fn: any){
    this.onTouched = fn
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  transformToDate(val: string = ''): Date {
    const { groups = {} } = val.match(this.formaReg) || {};
    const { month, day, year } = groups;
  
    if (!month || !day || !year) {
      return null;
    }

    return new Date(+year, +month - 1, +day);
  }

  onChange({ target }): void {
    const date = this.transformToDate(target.value);
    if (date) {
      this.writeValue(date);
    }

    this.onChanged(date);
    this.onTouched();
  }
}
