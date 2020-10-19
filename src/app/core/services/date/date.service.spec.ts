import { TestBed } from '@angular/core/testing';

import { DateService } from './date.service';

describe('DateService', () => {
  const service = new DateService();

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should show 0 minutes', () => {
    expect(service.getDuration()).toBe('0 min');
  });

  it('should show only minutes', () => {
    expect(service.getDuration(59)).toBe('59 min');
  });

  it('should show hours and minutes', () => {
    expect(service.getDuration(78)).toBe('1h 18 min');
  });
});
