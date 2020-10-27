// Core
import { ElementRef, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

// Directives
import { DateStatusDirective } from './date-status.directive';

// Utils
import { dateUtils } from '../../../utils';

// Test component
const currDate = new Date();
@Component({
  template: `
    <div [appDateStatus]="dateFresh">Fresh Item</div>
    <div [appDateStatus]="dateUpcoming">Upcoming Date</div>
    <div [appDateStatus]="dateOld">Old Date</div>
  `
})
class TestComponent {
  dateFresh = currDate;
  dateUpcoming = dateUtils.shiftDate(currDate, { daysShift: 1 });
  dateOld = dateUtils.shiftDate(currDate, { daysShift: -15 });
}

describe('DateStatusDirective', () => {
  let fixture;

  const SELECTOR_FRESH = 'div:first-of-type';
  const SELECTOR_UPCOMING = 'div:nth-of-type(2)';
  const SELECTOR_DEFAULT = 'div:last-of-type';

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ DateStatusDirective, TestComponent ]
    })
    .createComponent(TestComponent);
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const directive = new DateStatusDirective(new ElementRef('div'));
    expect(directive).toBeTruthy();
  });

  it('fresh item should be with border', () => {
    return fixture.whenStable().then(() => {
      const freshItem = fixture.nativeElement.querySelector(SELECTOR_FRESH);
      expect(freshItem.style.borderColor).toEqual('green');
    });
  });

  it('upcoming item should be with border', () => {
    return fixture.whenStable().then(() => {
      const upcomingItem = fixture.nativeElement.querySelector(SELECTOR_UPCOMING);
      expect(upcomingItem.style.borderColor).toEqual('blue');
    });
  });

  it('default item should be without inner border style', () => {
    return fixture.whenStable().then(() => {
      const defaultItem = fixture.nativeElement.querySelector(SELECTOR_DEFAULT);
      expect(defaultItem.style.borderColor).toEqual('');
    });
  });
});
