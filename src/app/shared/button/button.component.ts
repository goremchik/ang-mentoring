// Core
import { Component, Input } from '@angular/core';

// Models
import { Icon } from '../../core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() text: string;
  @Input() type = 'button';
  @Input() icon: Icon;
}
