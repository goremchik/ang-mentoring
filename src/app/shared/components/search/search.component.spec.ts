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

  it('inputChanged should call onInput', () => {
    const spy = spyOn(component, 'onInput');
    const input = de.query(By.directive(InputComponent)).componentInstance;
    input.inputChanged.emit(inputValue);
    expect(spy).toHaveBeenCalledWith(inputValue);
  });

  it('onInput should change value', () => {
    const spy = spyOn(component.subject$$, 'next');
    component.onInput(inputValue);

    expect(component.searchValue).toBe(inputValue);
    expect(spy).toHaveBeenCalledWith(inputValue);
  });
});
