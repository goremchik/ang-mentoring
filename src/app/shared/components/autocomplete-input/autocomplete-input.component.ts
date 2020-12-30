// Core
import {
  Component, Input, forwardRef, ElementRef, ViewChild
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

// Models
import { IAuthor } from 'src/app/core';

@Component({
  selector: 'app-autocomplete-input',
  templateUrl: './autocomplete-input.component.html',
  styleUrls: ['./autocomplete-input.component.scss'],
  providers: [     
    {
      provide: NG_VALUE_ACCESSOR, 
      useExisting: forwardRef(() => AutocompleteInputComponent),
      multi: true     
    },
  ],
})
export class AutocompleteInputComponent implements ControlValueAccessor {
  @Input() placeholder = '';
  @Input() invalid = false;
  @Input() suggestions: IAuthor[] = [];

  @ViewChild('input') inputChild: ElementRef;

  value: string = '';
  selectedItems: IAuthor[] = [];
  disabled = false;
  focused = false;

  onChanged: any = () => {}
  onTouched: any = () => {}

  writeValue(val) {
    this.selectedItems = val || [];
    this.onChanged(val);
    this.onTouched();
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

  onFocus() {
    this.focused = true;
  }

  onBlur = () => setTimeout(() => {
    this.focused = this.inputChild.nativeElement === document.activeElement;
  }, 100);

  get suggestionsToShow() {
      return !this.focused || this.value.length < 2
        ? [] 
        : this.suggestions
          .filter(({ name = '', id: itemId }) => {
            return name.toLowerCase().includes(this.value.toLowerCase()) 
              && !this.selectedItems.find(({ id }) => itemId === id);
          })
  }

  onSelect(item) {
    const items = [ ...this.selectedItems, item ];
    this.writeValue(items);
    this.value = '';
  }

  onDelete(id) {
    const items = this.selectedItems.filter(({ id: itemId }) => itemId !== id);
    this.writeValue(items);
  }
}
