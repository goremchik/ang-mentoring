import { Component, OnInit, Input } from '@angular/core';
import { Icon } from '../../core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() text: string;
  @Input() icon: Icon;

  constructor() { }

  ngOnInit(): void {
  }

}
