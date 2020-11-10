// Core
import { Component, Input } from '@angular/core';

// Models
import { Icon } from 'src/app/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() text: string;
  @Input() type = 'button';
  @Input() icon: Icon;
  @Input() btnDisabled = false;
  @Input() modifier = 'default';
}
