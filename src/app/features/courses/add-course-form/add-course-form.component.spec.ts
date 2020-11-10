// Core
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// Components
import { AddCourseFormComponent } from './add-course-form.component';

describe('AddCourseFormComponent', () => {
  let component: AddCourseFormComponent;
  let fixture: ComponentFixture<AddCourseFormComponent>;
  let de;

  const newTitle = 'new title';
  const SELECTOR_CANCEL = '.form__cancel';
  const SELECTOR_SUBMIT = '.form__save';

  const title = 'test title';
  const description = 'test description';
  const duration = '10';
  const creationDate = '10/20/2020';
  const authors = 'test authors';
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

  it('cancel btn click should call onCancel', () => {
    spyOn(component, 'onCancel');
    const button = de.nativeElement.querySelector(SELECTOR_CANCEL);
    button.click();

    expect(component.onCancel).toHaveBeenCalled();
  });

  it('onCancel should emit formCancel event', () => {
    const spy = spyOn(component.formCancel, 'emit');
    component.onCancel();
    expect(spy).toHaveBeenCalled();
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
