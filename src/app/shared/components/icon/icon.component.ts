// Core
import { Component, Input } from '@angular/core';

// Models
import { Icon } from '../../../core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent {
  @Input() code: Icon;
}
