// Core
import {
  Component, Input, Output, EventEmitter, ChangeDetectionStrategy
} from '@angular/core';

// Models
import { InputModifier } from 'src/app/core';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerComponent {
  @Input() value = '';
  @Input() name = '';
  @Input() placeholder = '';
  @Input() label = '';
  @Input() required = false;
  @Input() modifier: InputModifier = InputModifier.Default;

  @Output() inputChanged: EventEmitter<string> = new EventEmitter<string>();

  onInput(value): void {
    this.inputChanged.emit(value);
  }
}
