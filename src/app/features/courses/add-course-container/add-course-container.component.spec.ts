// Core
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';

// Components
import { AddCourseContainerComponent } from './add-course-container.component';
import { AddCourseFormComponent } from '../add-course-form/add-course-form.component';

// Mocks
import { courses } from 'src/app/mock/courses';

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
    },
  };

  const authors = [{ id: 1, name: 'name', lastName: 'test' }];

  const bareFormData = {
    title: 'title',
    description: 'description',
    authors,
    duration: '10',
    creationDate: '10/09/2020',
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
      imports: [ RouterTestingModule ],
      declarations: [ AddCourseContainerComponent, AddCourseFormComponent ],
      providers: [ provideMockStore({ initialState }) ],
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
    form.formSubmit.emit(bareFormData);

    expect(spy).toHaveBeenCalledWith(bareFormData);
  });

  it('onFormSubmit should create course', () => {
    const spyCreate = spyOn(component.store$, 'dispatch');
    store.overrideSelector(coursesSelectors.getCurrentItem, null);
    store.refreshState();
    fixture.detectChanges();
    component.onFormSubmit(bareFormData);

    expect(spyCreate).toHaveBeenCalledWith(
      coursesActions.createCourse({ course: formData })
    );
  });

  it('onFormSubmit should update course', () => {
    const spyCreate = spyOn(component.store$, 'dispatch');
    component.courseId = '1';
    component.onFormSubmit(bareFormData);

    expect(spyCreate).toHaveBeenCalledWith(
      coursesActions.updateCourse({ course: updatedFormData })
    );
  });
});
