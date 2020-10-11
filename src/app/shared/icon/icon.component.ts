import { Component, OnInit, Input } from '@angular/core';
import { Icon } from '../../core';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {
  @Input() code: Icon;
  constructor() { }

  ngOnInit(): void {
  }

}
