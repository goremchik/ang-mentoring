// Core
import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

// Models
import { Icon } from 'src/app/core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  @Input() code: Icon;
}
