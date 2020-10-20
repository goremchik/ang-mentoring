import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCourseComponent } from './add-course.component';

describe('AddCourseComponent', () => {
  let component: AddCourseComponent;
  let fixture: ComponentFixture<AddCourseComponent>;
  let de;

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

  it('should call onClick', () => {
    spyOn(component, 'onClick');

    const button = de.nativeElement.querySelector('app-button');
    button.click();

    return fixture.whenStable().then(() => {
      expect(component.onClick).toHaveBeenCalled();
    });
  });

  it('onClick should emit event', () => {
    spyOn(component.add, 'emit');
    component.onClick();

    return fixture.whenStable().then(() => {
      expect(component.add.emit).toHaveBeenCalled();
    });
  });
});
