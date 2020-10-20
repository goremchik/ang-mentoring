import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { CoursesListComponent } from './courses-list.component';
import { CourseItemComponent } from '../course-item/course-item.component';
import { ICourse } from '../../../core';

describe('CoursesListComponent', () => {
  let component: CoursesListComponent;
  let fixture: ComponentFixture<CoursesListComponent>;
  let de;
  const courseId = '1';

  const courses: ICourse[] = [{
    id: '1',
    title: '',
    creationDate: new Date(),
    duration: 0,
    description: '',
  }];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesListComponent, CourseItemComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesListComponent);
    component = fixture.componentInstance;
    component.courses = courses;
    fixture.detectChanges();
    de = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('edit event should call onEdit', () => {
    spyOn(component, 'onEdit');
    const item = de.query(By.directive(CourseItemComponent)).componentInstance;
    item.edit.emit(courseId);

    return fixture.whenStable().then(() => {
      expect(component.onEdit).toHaveBeenCalledWith(courseId);
    });
  });

  it('onEdit should re-emit edit event', () => {
    spyOn(component.edit, 'emit');
    component.onEdit(courseId);

    return fixture.whenStable().then(() => {
      expect(component.edit.emit).toHaveBeenCalledWith(courseId);
    });
  });

  it('delete event should call onDelete', () => {
    spyOn(component, 'onDelete');
    const item = de.query(By.directive(CourseItemComponent)).componentInstance;
    item.delete.emit(courseId);

    return fixture.whenStable().then(() => {
      expect(component.onDelete).toHaveBeenCalledWith(courseId);
    });
  });

  it('onDelete should re-emit event', () => {
    spyOn(component.delete, 'emit');
    component.onDelete(courseId);

    return fixture.whenStable().then(() => {
      expect(component.delete.emit).toHaveBeenCalledWith(courseId);
    });
  });
});
