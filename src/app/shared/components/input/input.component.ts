// Core
import {
  Component, Input, Output, EventEmitter, ChangeDetectionStrategy
} from '@angular/core';

// Models
import { InputModifier } from 'src/app/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputComponent {
  @Input() value = '';
  @Input() name = '';
  @Input() placeholder = '';
  @Input() label = '';
  @Input() required = false;
  @Input() type = 'text';
  @Input() modifier: InputModifier = InputModifier.Default;

  @Output() inputChanged: EventEmitter<string> = new EventEmitter<string>();

  onInput(value): void {
    this.inputChanged.emit(value);
  }
}
