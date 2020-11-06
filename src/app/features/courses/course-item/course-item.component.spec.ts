// Core
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// Components
import { CourseItemComponent } from './course-item.component';

// Pipes
import { DurationPipe } from '../../../shared/pipes/duration/duration.pipe';

// Models
import { ICourse } from '../../../core';

// Mocks
import { courses } from '../../../mock';

describe('CourseItemComponent', () => {
  let component: CourseItemComponent;
  let fixture: ComponentFixture<CourseItemComponent>;
  let de;

  const course: ICourse = courses[0];
  const SELECTOR_EDIT_BTN = '.course__edit';
  const SELECTOR_DELETE_BTN = '.course__delete';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseItemComponent, DurationPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseItemComponent);
    component = fixture.componentInstance;
    component.course = course;
    fixture.detectChanges();
    de = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onEditClick', () => {
    spyOn(component, 'onEditClick');

    const button = de.nativeElement.querySelector(SELECTOR_EDIT_BTN);
    button.click();

    expect(component.onEditClick).toHaveBeenCalled();
  });

  it('onEditClick should emit edit event', () => {
    spyOn(component.edit, 'emit');
    component.onEditClick();

    expect(component.edit.emit).toHaveBeenCalledWith(component.course.id);
  });

  it('should call onDeleteClick', () => {
    spyOn(component, 'onDeleteClick');
    const button = de.nativeElement.querySelector(SELECTOR_DELETE_BTN);
    button.click();

    expect(component.onDeleteClick).toHaveBeenCalled();
  });

  it('onDeleteClick should emit event', () => {
    spyOn(component.delete, 'emit');
    component.onDeleteClick();

    expect(component.delete.emit).toHaveBeenCalledWith(component.course.id);
  });
});
