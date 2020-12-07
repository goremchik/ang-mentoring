// Core
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

// Components
import { SearchComponent } from './search.component';
import { InputComponent } from '../input/input.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let de;
  const inputValue = 'input';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchComponent, InputComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('inputChanged should call onInput', () => {
    spyOn(component, 'onInput');
    const input = de.query(By.directive(InputComponent)).componentInstance;
    input.inputChanged.emit(inputValue);

    expect(component.onInput).toHaveBeenCalledWith(inputValue);
  });

  it('onInput should change value', () => {
    component.onInput(inputValue);
    expect(component.searchValue).toBe(inputValue);
  });

  it('onSubmit should called after button click', () => {
    spyOn(component, 'onSubmit');

    const button = de.nativeElement.querySelector('app-button');
    button.click();

    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('onSubmit should emit event', () => {
    const event = new Event('submit');
    const spyEmit = spyOn(component.searchChange, 'emit');
    const spyEvent = spyOn(event, 'preventDefault');

    component.searchValue = inputValue;
    component.onSubmit(event);

    expect(spyEvent).toHaveBeenCalled();
    expect(spyEmit).toHaveBeenCalledWith(inputValue);
  });
});
