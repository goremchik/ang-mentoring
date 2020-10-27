// Core
import { Directive, Input, ElementRef, OnChanges } from '@angular/core';

// Utils
import { dateUtils } from '../../../utils';

@Directive({
  selector: '[appDateStatus]'
})
export class DateStatusDirective implements OnChanges {
  @Input('appDateStatus') dateValue: Date;
  @Input() freshDaysLimit = 14;
  @Input() freshDateColor = 'green';
  @Input() upcomingDateColor = 'blue';

  constructor(private el: ElementRef) { }

  ngOnChanges() {
    const currentDate = new Date();
    const freshDateLimit = dateUtils.shiftDate(currentDate, {
      daysShift: -this.freshDaysLimit,
    });
    let borderColor = '';

    if (this.dateValue < currentDate && this.dateValue >= freshDateLimit) {
      borderColor = this.freshDateColor;
    } else if (this.dateValue > currentDate) {
      borderColor = this.upcomingDateColor;
    }

    this.el.nativeElement.style.borderColor = borderColor;
  }
}
