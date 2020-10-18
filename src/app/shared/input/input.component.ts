import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent {
  @Input() value = '';
  @Input() name = '';
  @Input() placeholder = '';
  @Input() type = 'text';

  @Output() inputChanged: EventEmitter<string> = new EventEmitter<string>();

  onInput(value): void {
    console.log('input onInput event', value);
    this.inputChanged.emit(this.value);
  }
}
