// Core
import { Component, Input, Output, EventEmitter } from '@angular/core';

// Models
import { IDialog } from 'src/app/core';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements IDialog {
  @Input() title = '';
  @Input() confirmText = '';
  @Input() cancelText = '';
  @Input() hasActions = false;

  @Output() cancel = new EventEmitter<string>();
  @Output() confirm = new EventEmitter<string>();

  opened = false;

  open(): void {
    this.opened  = true;
  }

  close(): void {
    this.opened  = false;
  }

  onConfirmClick(): void {
    this.close();
    this.confirm.emit();
  }

  onCancelClick(): void {
    this.close();
    this.cancel.emit();
  }
}
