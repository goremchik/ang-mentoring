// Core
import { async, ComponentFixture, TestBed, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

// Components
import { AutocompleteInputComponent } from './autocomplete-input.component';

// Mocks
import { authors } from 'src/app/mock';

describe('AutocompleteInputComponent', () => {
  let component: AutocompleteInputComponent;
  let fixture: ComponentFixture<AutocompleteInputComponent>;
  const inputValue = 'last2';
  let de;

  const author = authors[0];
  const SELECTOR_REMOVE = '.autocomplete__remove';
  const SELECTOR_ADD = '.autocomplete__suggestion-item';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutocompleteInputComponent ],
      imports: [ FormsModule ],
      providers: [{ provide: ComponentFixtureAutoDetect, useValue: true }]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteInputComponent);
    component = fixture.componentInstance;
    component.suggestions = authors;
    fixture.detectChanges();
    de = fixture.debugElement;
  });

  it('remove click should call onDelete', () => {
    const spy = spyOn(component, 'onDelete');
    component.selectedItems = [author];
    fixture.detectChanges();

    const removeEl = de.nativeElement.querySelector(SELECTOR_REMOVE);
    removeEl.click();
    expect(spy).toHaveBeenCalledWith(author.id);
  });

  it('select suggestion should call onSelect', () => {
    const spy =  spyOn(component, 'onSelect');
    component.onFocus();
    component.value = inputValue;
    fixture.detectChanges();

    const addEl = de.nativeElement.querySelector(SELECTOR_ADD);
    addEl.click();
    expect(spy).toHaveBeenCalledWith(authors[1]);
  });

  it('onDelete should remove item from list', () => {
    const spy = spyOn(component, 'writeValue');
    component.selectedItems = [author];
    component.onDelete(author.id);

    expect(spy).toHaveBeenCalledWith([]);
  });

  it('onSelect should add item to list and empty input', () => {
    const spy =  spyOn(component, 'writeValue');
    component.onSelect(author);

    expect(spy).toHaveBeenCalledWith([author]);
    expect(component.value).toBe('');
  });

  it('writeValue should set input component state', () => {
    const spyChanged = spyOn(component, 'onChanged');
    const spyTouched = spyOn(component, 'onTouched');
    component.writeValue([author]);

    expect(spyChanged).toHaveBeenCalledWith([author]);
    expect(spyTouched).toHaveBeenCalled();
    expect(component.selectedItems).toEqual([author]);
  });

  it('suggestionsToShow should return empty list', () => {
    expect(component.suggestionsToShow).toEqual([]);
  });

  it('suggestionsToShow should return 1 element', () => {
    component.onFocus();
    component.value = inputValue;

    expect(component.suggestionsToShow).toEqual([authors[1]]);
  });
});
