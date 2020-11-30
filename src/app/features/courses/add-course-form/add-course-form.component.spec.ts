// Core
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// Components
import { AddCourseFormComponent } from './add-course-form.component';

// Mocks
import { courses } from 'src/app/mock';

describe('AddCourseFormComponent', () => {
  let component: AddCourseFormComponent;
  let fixture: ComponentFixture<AddCourseFormComponent>;
  let de;

  const newTitle = 'new title';
  const SELECTOR_SUBMIT = '.form__save';

  const title = 'test title';
  const description = 'test description';
  const duration = '10';
  const creationDate = '10/20/2020';
  const authors = [{ id: 1, name: 'test', lastName: 'test' }];
  const formData = { title, description, duration, creationDate, authors };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCourseFormComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCourseFormComponent);
    component = fixture.componentInstance;
    component.title = title;
    component.description = description;
    component.duration = duration;
    component.creationDate = creationDate;
    component.authors = authors;

    fixture.detectChanges();
    de = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init course data', () => {
    component.title = '';
    component.description = '';
    component.duration = '';
    component.creationDate = '';
    component.authors = [];
    component.course = courses[0];
    component.ngOnChanges();

    expect(component.title).toEqual(courses[0].title);
    expect(component.description).toEqual(courses[0].description);
    expect(component.duration).toEqual(courses[0].duration.toString());
    expect(component.creationDate).toEqual(courses[0].creationDate.toString());
    expect(component.authors).toEqual(courses[0].authors);
  });

  it('should call onSubmit', () => {
    const spy = spyOn(component, 'onSubmit');
    const button = de.nativeElement.querySelector(SELECTOR_SUBMIT);
    button.click();

    expect(spy).toHaveBeenCalled();
  });

  it('onSubmit should emit event', () => {
    const spy = spyOn(component.formSubmit, 'emit');
    component.onSubmit(new Event('submit'));

    expect(spy).toHaveBeenCalledWith(formData);
  });

  it('form should be valid', () => {
    expect(component.isValid()).toBeTrue();
  });

  it('form should be invalid', () => {
    component.title = '';
    fixture.detectChanges();
    expect(component.isValid()).toBeFalse();
  });

  it('inputHandler should change component state', () => {
    component.inputHandler(newTitle, 'title');
    expect(component.title).toEqual(newTitle);
  });
});
