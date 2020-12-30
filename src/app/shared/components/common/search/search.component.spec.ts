// Core
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

// Components
import { SearchComponent } from './search.component';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let de;

  const inputValue = 'input';
  const SELECTOR_FORM = 'form';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, TranslateModule.forRoot() ],
      declarations: [ SearchComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement;
  });

  it('submit event should call onSubmit', () => {
    const spy = spyOn(component, 'onSubmit');
    const form = de.nativeElement.querySelector(SELECTOR_FORM);
    form.dispatchEvent(new Event('submit'));
    expect(spy).toHaveBeenCalled();
  });

  it('onSubmit should change value', () => {
    const spy = spyOn(component.searchChange, 'emit');
    component.form.patchValue({ search: inputValue });
    component.onSubmit();
    expect(spy).toHaveBeenCalledWith(inputValue);
  });
});
