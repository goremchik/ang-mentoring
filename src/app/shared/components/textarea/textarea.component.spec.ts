// Core
import {
  async, ComponentFixture, TestBed, tick, fakeAsync,
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

// Components
import { TextareaComponent } from './textarea.component';

describe('TextareaComponent', () => {
  let component: TextareaComponent;
  let fixture: ComponentFixture<TextareaComponent>;
  const inputValue = 'value';
  let de;

  const SELECTOR_INPUT = 'textarea';
  const EVENT_INPUT = 'input';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TextareaComponent ],
      imports: [ FormsModule, ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TextareaComponent);
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

    expect(component.onInput).toHaveBeenCalledWith(inputValue);
  }));

  it('onInput should dispatch inputChanged event', () => {
    spyOn(component.inputChanged, 'emit');
    component.onInput(inputValue);

    expect(component.inputChanged.emit).toHaveBeenCalledWith(inputValue);
  });
});