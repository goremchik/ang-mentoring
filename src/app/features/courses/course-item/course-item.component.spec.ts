// Core
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';

// Components
import { CourseItemComponent } from './course-item.component';

// Pipes
import { DurationPipe } from 'src/app/shared/pipes/duration/duration.pipe';

// Models
import { ICourse } from 'src/app/core';

// Mocks
import { courses } from 'src/app/mock';

describe('CourseItemComponent', () => {
  let component: CourseItemComponent;
  let fixture: ComponentFixture<CourseItemComponent>;
  let de;

  const course: ICourse = courses[0];
  const SELECTOR_DELETE_BTN = '.course__delete';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseItemComponent, DurationPipe ],
      imports: [ TranslateModule.forRoot() ],
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
