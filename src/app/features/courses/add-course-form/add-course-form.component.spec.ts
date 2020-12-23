// Core
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule, FormBuilder, FormsModule } from '@angular/forms';

// Components
import { AddCourseFormComponent } from './add-course-form.component';
import { DurationInputComponent } from 'src/app/shared/components/duration-input/duration-input.component';
import { DatePickerComponent } from 'src/app/shared/components/date-picker/date-picker.component';
import { AutocompleteInputComponent } from 'src/app/shared/components/autocomplete-input/autocomplete-input.component';

// Pipes
import { DurationPipe } from 'src/app/shared/pipes/duration/duration.pipe';

// Mocks
import { courses, authors } from 'src/app/mock';

describe('AddCourseFormComponent', () => {
  let component: AddCourseFormComponent;
  let fixture: ComponentFixture<AddCourseFormComponent>;
  let de;

  const SELECTOR_FORM = 'form';

  const title = 'test title';
  const description = 'test description';
  const duration = '10';
  const creationDate = '10/20/2020';
  const formData = { id: null, title, description, duration, creationDate, authors };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, FormsModule ],
      declarations: [
        AddCourseFormComponent,
        DurationInputComponent,
        DatePickerComponent,
        AutocompleteInputComponent,
        DurationPipe,
      ],
      providers: [ FormBuilder ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCourseFormComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    de = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init course data', () => {
    const spy = spyOn(component.form, 'patchValue');
    component.course = courses[0];
    component.ngOnChanges();

    expect(spy).toHaveBeenCalledWith(courses[0]);
  });

  it('should call onSubmit', () => {
    const spy = spyOn(component, 'onSubmit');
    const form = de.nativeElement.querySelector(SELECTOR_FORM);
    form.dispatchEvent(new Event('submit'));

    expect(spy).toHaveBeenCalled();
  });

  it('onSubmit should emit default course data', () => {
    const spy = spyOn(component.formSubmit, 'emit');
    component.course = courses[0];
    component.ngOnChanges();
    component.onSubmit();
    const { topRated, ...expectedData } = courses[0];
    expect(spy).toHaveBeenCalledWith(expectedData);
  });

  it('onSubmit should emit form data', () => {
    const spy = spyOn(component.formSubmit, 'emit');
    component.form.patchValue(formData);

    component.onSubmit();
    expect(spy).toHaveBeenCalledWith(formData);
  });
});
