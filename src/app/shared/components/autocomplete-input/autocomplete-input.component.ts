// Core
import {
  Component, Input, Output, EventEmitter, ChangeDetectionStrategy
} from '@angular/core';

// Models
import { InputModifier } from 'src/app/core';

@Component({
  selector: 'app-autocomplete-input',
  templateUrl: './autocomplete-input.component.html',
  styleUrls: ['./autocomplete-input.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AutocompleteInputComponent {
  @Input() value: any[] = [];
  @Input() name = '';
  @Input() placeholder = '';
  @Input() label = '';
  @Input() required = false;
  @Input() modifier: InputModifier = InputModifier.Default;

  @Output() inputChanged: EventEmitter<any[]> = new EventEmitter<any[]>();

  getStrValue(): string {
    // Temporary solution
    return this.value && this.value
      .map(({ name, lastName }) => `${name} ${lastName}`.trim())
      .join(', ');
  }

  onInput(): void {
    // Will be replaced in future commits
    this.inputChanged.emit(this.value);
  }
}
