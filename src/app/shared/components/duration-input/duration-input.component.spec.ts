// Core
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

// Components
import { DurationInputComponent } from './duration-input.component';

// Pipes
import { DurationPipe } from '../../pipes/duration/duration.pipe';

describe('DurationInputComponent', () => {
  let component: DurationInputComponent;
  let fixture: ComponentFixture<DurationInputComponent>;
  const inputValue = '10';
  let de;

  const SELECTOR_INPUT = 'input';
  const EVENT_INPUT = 'input';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DurationInputComponent, DurationPipe ],
      imports: [ FormsModule, ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DurationInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement;
  });

  it('input event should update input state', () => {
    const writeSpy = spyOn(component, 'writeValue');
    const changedSpy = spyOn(component, 'onChanged');
    const touchedSpy = spyOn(component, 'onTouched');

    const input = de.nativeElement.querySelector(SELECTOR_INPUT);
    input.value = inputValue;
    input.dispatchEvent(new Event(EVENT_INPUT));

    expect(writeSpy).toHaveBeenCalledWith(inputValue);
    expect(changedSpy).toHaveBeenCalledWith(+inputValue);
    expect(touchedSpy).toHaveBeenCalled();
  });

  it('empty input event should return old value', () => {
    const writeSpy = spyOn(component, 'writeValue');
    component.value = inputValue;

    const input = de.nativeElement.querySelector(SELECTOR_INPUT);
    input.value = '';
    input.dispatchEvent(new Event(EVENT_INPUT));

    expect(writeSpy).toHaveBeenCalledWith(inputValue);
  });

  it('writeValue should set input string value', () => {
    component.writeValue(inputValue);
    expect(component.value).toEqual(inputValue);
  });

  it('updateElementValue should update html el', () => {
    component.updateElementValue(inputValue);
    const input = de.nativeElement.querySelector(SELECTOR_INPUT);
    expect(input.value).toEqual(inputValue);
  });

  it('filterSymbols should return only numbers number', () => {
    expect(component.filterSymbols('11q1')).toEqual('111');
  });
});
