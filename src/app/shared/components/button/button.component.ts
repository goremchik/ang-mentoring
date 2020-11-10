// Core
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

// Models
import { Icon, ButtonModifier, ButtonType } from 'src/app/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  @Input() text: string;
  @Input() type: ButtonType = ButtonType.Button;
  @Input() icon: Icon;
  @Input() btnDisabled = false;
  @Input() link = '';
  @Input() modifier: ButtonModifier = ButtonModifier.Default;
}
