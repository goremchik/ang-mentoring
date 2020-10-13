import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Input() value = '';
  @Input() name = '';
  @Input() placeholder = '';
  @Input() type = 'text';

  @Output() inputChanged: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  onInput(val) {
    console.log('input onInput event', val);
    this.inputChanged.emit(this.value);
  }
}
