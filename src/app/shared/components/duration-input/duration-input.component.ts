// Core
import {
  Component, Input, ViewChild, ElementRef, AfterViewInit
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl } from '@angular/forms';

@Component({
  selector: 'app-duration-input',
  templateUrl: './duration-input.component.html',
  styleUrls: ['./duration-input.component.scss'],
  providers: [     
    {
      provide: NG_VALUE_ACCESSOR, 
      useExisting: DurationInputComponent,
      multi: true     
    },
    {
      provide: NG_VALIDATORS,
      useExisting: DurationInputComponent,
      multi: true
    }
  ],
})
export class DurationInputComponent 
  implements ControlValueAccessor, AfterViewInit {
  @Input() placeholder = '';
  @Input() invalid = false;

  @ViewChild('input') inputChild: ElementRef;
  value = '0';
  disabled = false;

  ngAfterViewInit() {
    this.updateElementValue(this.value);
  }

  onChanged: any = () => {}
  onTouched: any = () => {}

  writeValue(val = '0'): void {
    this.value = '' + (val || 0);

    if (this.inputChild) {
      this.updateElementValue(val);
    }
  }

  registerOnChange(fn: any): void {
    this.onChanged = fn
  }
  registerOnTouched(fn: any): void {
    this.onTouched = fn
  }

  validate({ value }: FormControl) {
    const isNotValid = !Number.isInteger(value);
    return isNotValid && {
      invalid: true
    }
  }

  updateElementValue(val: string): void {
    this.inputChild.nativeElement.value = val;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  filterSymbols = (value = ''): string => value.split('')
    .filter((i) => Number.isInteger(+i))
    .join('');

  onInput({ target }): void {
    const { value = '' } = target;

    if (value) {
      const filteredValue = this.filterSymbols(value);
      this.writeValue(filteredValue);
      this.onChanged(+filteredValue || 0);
      this.onTouched();
    } else {
      this.writeValue(this.value);
    }
  }
}
