import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

@Directive({
  selector: '[appDisableEl]'
})
export class DisableElDirective  implements OnChanges {
  @Input('appDisableEl') disabled: boolean;

  constructor(private el: ElementRef) { }

  ngOnChanges() {
    this.el.nativeElement.disabled = this.disabled;
  }
}
