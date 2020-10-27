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

  it('onInput should change value and call console.log', () => {
    spyOn(console, 'log');
    component.onInput(inputValue);

    expect(console.log).toHaveBeenCalledWith('On input: ', inputValue);
    expect(component.searchValue).toBe(inputValue);
  });

  it('onSubmit should called after button click', () => {
    spyOn(component, 'onSubmit');

    const button = de.nativeElement.querySelector('app-button');
    button.click();

    expect(component.onSubmit).toHaveBeenCalled();
  });

  it('onSubmit should call console.log and clear value', () => {
    const event = new Event('submit');
    spyOn(console, 'log');
    spyOn(event, 'preventDefault');

    component.searchValue = inputValue;
    component.onSubmit(event);

    expect(event.preventDefault).toHaveBeenCalled();
    expect(console.log).toHaveBeenCalledWith('Entered value: ', inputValue);
    expect(component.searchValue).toBe('');
  });
});
