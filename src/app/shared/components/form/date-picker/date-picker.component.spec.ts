// Core
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

// Components
import { DatePickerComponent } from './date-picker.component';

describe('DatePickerComponent', () => {
  let component: DatePickerComponent;
  let fixture: ComponentFixture<DatePickerComponent>;
  const inputValue = '11/14/2020';
  const inputDate = new Date(2020, 10, 14);
  let de;

  const SELECTOR_INPUT = 'input';
  const EVENT_INPUT = 'change';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatePickerComponent ],
      imports: [ FormsModule, ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatePickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement;
  });

  it('change event should set input component state', () => {

    const spyWrite = spyOn(component, 'writeValue');
    const spyChanged = spyOn(component, 'onChanged');
    const spyTouched = spyOn(component, 'onTouched');

    const input = de.nativeElement.querySelector(SELECTOR_INPUT);
    input.value = inputValue;
    input.dispatchEvent(new Event(EVENT_INPUT));

    expect(spyWrite).toHaveBeenCalledWith(inputDate);
    expect(spyChanged).toHaveBeenCalledWith(inputDate);
    expect(spyTouched).toHaveBeenCalled();
  });

  it('writeValue should set input string value', () => {
    component.writeValue(inputDate);
    expect(component.value).toEqual(inputDate);
  });

  it('transformToDate should convert string to date', () => {
    expect(component.transformToDate(inputValue)).toEqual(inputDate);
  });

  it('transformToDate should return null with wrong string', () => {
    expect(component.transformToDate('11/14')).toEqual(null);
  });
});
