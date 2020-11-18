// Core
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

// Components
import { AddCourseContainerComponent } from './add-course-container.component';
import { AddCourseFormComponent } from '../add-course-form/add-course-form.component';

// Mocks
import { courses } from 'src/app/mock/courses';

// Services
import { CourseService } from 'src/app/core/services/courses/courses.service';

describe('AddCourseContainerComponent', () => {
  let component: AddCourseContainerComponent;
  let fixture: ComponentFixture<AddCourseContainerComponent>;
  let de;

  const bareFormData = {
    title: 'title',
    description: 'description',
    authors: 'authors',
    duration: '10',
    creationDate: '10/09/2020',
  };

  const formData = {
    id: null,
    title: 'title',
    description: 'description',
    authors: ['authors'],
    duration: 10,
    creationDate: new Date('10/09/2020'),
  };

  const updatedFormData = { ...formData, id: '1' };

  const homePage = ['/'];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ AddCourseContainerComponent, AddCourseFormComponent ],
      providers: [ CourseService ],
    })
    .compileComponents();
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

  it('onFormSubmit should create course and redirect', () => {
    const spyCreate = spyOn(component.courseService, 'createCourse');
    const spyRedirect = spyOn(component, 'redirectToHome');
    component.onFormSubmit(bareFormData);

    expect(spyCreate).toHaveBeenCalledWith(formData);
    expect(spyRedirect).toHaveBeenCalled();
  });

  it('onFormSubmit should update course and redirect', () => {
    const spyCreate = spyOn(component.courseService, 'updateItem');
    const spyRedirect = spyOn(component, 'redirectToHome');

    component.course = courses[0];
    component.onFormSubmit(bareFormData);

    expect(spyCreate).toHaveBeenCalledWith(updatedFormData);
    expect(spyRedirect).toHaveBeenCalled();
  });

  it('formCancel event should call onFormCancel', () => {
    spyOn(component, 'onFormCancel');
    const form = de.query(By.directive(AddCourseFormComponent)).componentInstance;
    form.formCancel.emit();

    expect(component.onFormCancel).toHaveBeenCalled();
  });

  it('onFormCancel should redirect', () => {
    const spy = spyOn(component, 'redirectToHome');
    component.onFormCancel();
    expect(spy).toHaveBeenCalled();
  });

  it('redirectToHome should redirect to home', () => {
    const spy = spyOn(component.router, 'navigate');
    component.redirectToHome();
    expect(spy).toHaveBeenCalledWith(homePage);
  });
});
