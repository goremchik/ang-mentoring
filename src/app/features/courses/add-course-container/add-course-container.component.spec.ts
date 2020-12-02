// Core
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

// Components
import { AddCourseContainerComponent } from './add-course-container.component';
import { AddCourseFormComponent } from '../add-course-form/add-course-form.component';

// Mocks
import { courses } from 'src/app/mock/courses';

// Services
import { CourseService } from 'src/app/core/services/courses/courses.service';
import { HttpService } from 'src/app/core/services/http/http.service';

describe('AddCourseContainerComponent', () => {
  let component: AddCourseContainerComponent;
  let fixture: ComponentFixture<AddCourseContainerComponent>;
  let de;

  const CourseServiceStub: Partial<CourseService> = {
    updateItem: () => of(null),
    createCourse: () => of(null),
    getItemById: () => of(courses[0]),
  };
  const authors = [{ id: 1, name: 'name', lastName: 'test' }];

  const bareFormData = {
    title: 'title',
    description: 'description',
    authors,
    duration: '10',
    creationDate: '10/09/2020',
    topRated: false,
  };

  const formData = {
    id: null,
    title: 'title',
    description: 'description',
    authors,
    duration: 10,
    creationDate: new Date('10/09/2020'),
    topRated: false,
  };

  const updatedFormData = { ...formData, id: '1', topRated: true };

  const homePage = ['/'];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule ],
      declarations: [ AddCourseContainerComponent, AddCourseFormComponent ],
      providers: [
        HttpService,
        { provide: CourseService, useValue: CourseServiceStub },
      ],
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

  it('onFormSubmit should create course', () => {
    const spyCreate = spyOn(component.courseService, 'createCourse')
      .and.returnValue(of(null));
    component.course = null;
    component.onFormSubmit(bareFormData);

    expect(spyCreate).toHaveBeenCalledWith(formData);
  });

  it('onFormSubmit should update course', () => {
    const spyUpdate = spyOn(component.courseService, 'updateItem')
      .and.returnValue(of(null));

    component.course = courses[0];
    component.onFormSubmit(bareFormData);

    expect(spyUpdate).toHaveBeenCalledWith(updatedFormData);
  });

  it('successHandler should redirect to home', () => {
    const spyRedirect = spyOn(component.router, 'navigate');
    component.successHandler();
    expect(spyRedirect).toHaveBeenCalledWith(homePage);
  });
});
