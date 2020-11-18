// Core
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// Components
import { AddCourseComponent } from './add-course.component';

describe('AddCourseComponent', () => {
  let component: AddCourseComponent;
  let fixture: ComponentFixture<AddCourseComponent>;
  let de;

  const SELECTOR_BUTTON = 'app-button';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
