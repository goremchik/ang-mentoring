// Core
import {
  async, ComponentFixture, TestBed, tick, fakeAsync,
} from '@angular/core/testing';
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

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onInput', fakeAsync(() => {
    fixture.detectChanges();
    spyOn(component, 'onInput');

    const input = de.nativeElement.querySelector(SELECTOR_INPUT);
    input.value = inputValue;
    input.dispatchEvent(new Event(EVENT_INPUT));
    tick(1);
    fixture.detectChanges();

    expect(component.onInput).toHaveBeenCalledWith(+inputValue);
  }));

  it('onInput should dispatch inputChanged event', () => {
    spyOn(component.inputChanged, 'emit');
    component.onInput(inputValue);

    expect(component.inputChanged.emit).toHaveBeenCalledWith(inputValue);
  });

  it('should convert input to number', () => {
    component.value = '10';
    expect(component.convertToNumber()).toEqual(10);
  });
});
