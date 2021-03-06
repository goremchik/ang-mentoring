// Core
import { ChangeDetectionStrategy } from '@angular/core';
import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

// Components
import { CoursesListComponent } from './courses-list.component';
import { CourseItemComponent } from '../course-item/course-item.component';

// Pipes
import { DurationPipe } from '../../../shared/pipes/duration/duration.pipe';

// Mocks
import { courses } from '../../../mock';

describe('CoursesListComponent', () => {
  let component: CoursesListComponent;
  let fixture: ComponentFixture<CoursesListComponent>;
  let de;

  const courseId = courses[0].id;
  const SELECTOR_ITEM = '.courses-list__item';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoursesListComponent, CourseItemComponent, DurationPipe ]
    })
    .overrideComponent(CoursesListComponent, {
      set: {
        changeDetection: ChangeDetectionStrategy.Default
      }
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

  it('delete event should call onDelete', () => {
    spyOn(component, 'onDelete');
    const item = de.query(By.directive(CourseItemComponent)).componentInstance;
    item.delete.emit(courseId);

    expect(component.onDelete).toHaveBeenCalledWith(courseId);
  });

  it('onDelete should re-emit event', () => {
    spyOn(component.delete, 'emit');
    component.onDelete(courseId);

    expect(component.delete.emit).toHaveBeenCalledWith(courseId);
  });

  it('should render courses list', () => {
    return fixture.whenStable().then(() => {
      const items = fixture.nativeElement.querySelectorAll(SELECTOR_ITEM);
      expect(items.length).toEqual(3);
    });
  });

  it('should render empty list', fakeAsync(() => {
    component.courses = [];
    fixture.detectChanges();

    return fixture.whenStable().then(() => {
      const items = fixture.nativeElement.querySelectorAll(SELECTOR_ITEM);
      expect(items.length).toEqual(0);
    });
  }));
});
