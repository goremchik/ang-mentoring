// Core
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule, FormBuilder } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';

// Components
import { AddCourseContainerComponent } from './add-course-container.component';
import { AddCourseFormComponent } from '../add-course-form/add-course-form.component';
import { DurationInputComponent } from 'src/app/shared/components/duration-input/duration-input.component';
import { DatePickerComponent } from 'src/app/shared/components/date-picker/date-picker.component';
import { AutocompleteInputComponent } from 'src/app/shared/components/autocomplete-input/autocomplete-input.component';

// Pipes
import { DurationPipe } from 'src/app/shared/pipes/duration/duration.pipe';

// Mocks
import { courses, authors } from 'src/app/mock';

// Store
import * as coursesSelectors from 'src/app/core/store/courses/courses.selectors';
import * as coursesActions from 'src/app/core/store/courses/courses.actions';

describe('AddCourseContainerComponent', () => {
  let component: AddCourseContainerComponent;
  let fixture: ComponentFixture<AddCourseContainerComponent>;
  let de;
  let store: MockStore;

  const initialState = {
    courses: {
      currentItemId: '1',
      entries: courses,
      authors,
    },
  };

  const formData = {
    id: null,
    title: 'title',
    description: 'description',
    authors,
    duration: 10,
    creationDate: new Date('10/09/2020'),
  };

  const updatedFormData = { ...formData, id: '1' };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        TranslateModule.forRoot(),
      ],
      declarations: [
        AddCourseContainerComponent,
        AddCourseFormComponent,
        DurationInputComponent,
        AutocompleteInputComponent,
        DatePickerComponent,
        DurationPipe,
      ],
      providers: [ FormBuilder, provideMockStore({ initialState }) ],
    })
    .compileComponents();

    store = TestBed.inject(MockStore);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCourseContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('formSubmit event should call onFormSubmit', () => {
    const spy = spyOn(component, 'onFormSubmit');
    const form = de.query(By.directive(AddCourseFormComponent)).componentInstance;
    form.formSubmit.emit(formData);

    expect(spy).toHaveBeenCalledWith(formData);
  });

  it('onFormSubmit should create course', () => {
    const spyCreate = spyOn(component.store$, 'dispatch');
    store.overrideSelector(coursesSelectors.getCurrentItem, null);
    store.refreshState();
    fixture.detectChanges();
    component.onFormSubmit(formData);

    expect(spyCreate).toHaveBeenCalledWith(
      coursesActions.createCourse({ course: formData })
    );
  });

  it('onFormSubmit should update course', () => {
    const spyCreate = spyOn(component.store$, 'dispatch');
    component.courseId = '1';
    component.onFormSubmit(updatedFormData);

    expect(spyCreate).toHaveBeenCalledWith(
      coursesActions.updateCourse({ course: updatedFormData })
    );
  });
});
