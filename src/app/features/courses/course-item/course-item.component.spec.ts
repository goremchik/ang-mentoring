import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseItemComponent } from './course-item.component';
import { ICourse } from '../../../core';

describe('CourseItemComponent', () => {
  let component: CourseItemComponent;
  let fixture: ComponentFixture<CourseItemComponent>;
  let de;

  const course: ICourse = {
    id: '1',
    title: '',
    creationDate: new Date(),
    duration: 0,
    description: '',
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseItemComponent ]
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

    const button = de.nativeElement.querySelector('app-button.course__edit');
    button.click();

    return fixture.whenStable().then(() => {
      expect(component.onEditClick).toHaveBeenCalled();
    });
  });

  it('onEditClick should emit edit event', () => {
    spyOn(component.edit, 'emit');
    component.onEditClick();

    return fixture.whenStable().then(() => {
      expect(component.edit.emit).toHaveBeenCalledWith(component.course.id);
    });
  });

  it('should call onDeleteClick', () => {
    spyOn(component, 'onDeleteClick');
    const button = de.nativeElement.querySelector('app-button.course__delete');
    button.click();

    return fixture.whenStable().then(() => {
      expect(component.onDeleteClick).toHaveBeenCalled();
    });
  });

  it('onDeleteClick should emit event', () => {
    spyOn(component.delete, 'emit');
    component.onDeleteClick();

    return fixture.whenStable().then(() => {
      expect(component.delete.emit).toHaveBeenCalledWith(component.course.id);
    });
  });
});
