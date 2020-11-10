// Core
import {
  Component, Input, Output, EventEmitter, ChangeDetectionStrategy
} from '@angular/core';

// Models
import { InputModifier } from 'src/app/core';

@Component({
  selector: 'app-duration-input',
  templateUrl: './duration-input.component.html',
  styleUrls: ['./duration-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DurationInputComponent {
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

  convertToNumber(): number {
    return this.value ? parseInt(this.value, 10) : 0;
  }
}
