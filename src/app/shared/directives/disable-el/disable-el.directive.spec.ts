// Core
import { ElementRef, Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

// Directives
import { DisableElDirective } from './disable-el.directive';

@Component({
  template: `
    <button [appDisableEl]="true">Disabled</button>
    <button [appDisableEl]="false">Enabled</button>
  `
})
class TestComponent {}

describe('DisableElDirective', () => {
  const SELECTOR_DISABLED = 'button:first-of-type';
  const SELECTOR_ENABLED = 'button:last-of-type';

  let fixture;
  let nativeEl;

  beforeEach(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [ DisableElDirective, TestComponent ]
    })
    .createComponent(TestComponent);
    fixture.detectChanges();
    nativeEl = fixture.nativeElement;
  });

  it('should create an instance', () => {
    const directive = new DisableElDirective(new ElementRef('button'));
    expect(directive).toBeTruthy();
  });

  it('button should be disabled', () => {
    const button = nativeEl.querySelector(SELECTOR_DISABLED);
    expect(button.disabled).toBeTrue();
  });

  it('button should be enabled', () => {
    const button = nativeEl.querySelector(SELECTOR_ENABLED);
    expect(button.disabled).toBeFalse();
  });
});
