// Core
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

// Components
import { CoursesContainerComponent } from './courses-container.component';
import { CoursesListComponent } from '../courses-list/courses-list.component';
import { AddCourseComponent } from '../add-course/add-course.component';
import { LoadMoreComponent } from '../../../shared/load-more/load-more.component';

// Mocks
import { courses } from '../../../mock';

describe('CoursesContainerComponent', () => {
  let component: CoursesContainerComponent;
  let fixture: ComponentFixture<CoursesContainerComponent>;
  let de;

  const courseId = courses[0].id;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CoursesContainerComponent,
        CoursesListComponent,
        AddCourseComponent,
        LoadMoreComponent,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should init courses', () => {
    expect(component.courses).toEqual(courses);
  });

  it('edit event should call onEdit', () => {
    spyOn(component, 'onEdit');
    const list = de.query(By.directive(CoursesListComponent)).componentInstance;
    list.edit.emit(courseId);

    expect(component.onEdit).toHaveBeenCalledWith(courseId);
  });

  it('onEdit should call console.log', () => {
    spyOn(console, 'log');
    component.onEdit(courseId);

    expect(console.log).toHaveBeenCalledWith('Edit course: ', courseId);
  });

  it('remove event should call onDelete', () => {
    spyOn(component, 'onDelete');
    const list = de.query(By.directive(CoursesListComponent)).componentInstance;
    list.delete.emit(courseId);

    expect(component.onDelete).toHaveBeenCalledWith(courseId);
  });

  it('onInput should call console.log', () => {
    spyOn(console, 'log');
    component.onDelete(courseId);

    expect(console.log).toHaveBeenCalledWith('Delete course: ', courseId);
  });

  it('add event should call onAdd', () => {
    spyOn(component, 'onAdd');
    const button = de.query(By.directive(AddCourseComponent)).componentInstance;
    button.add.emit();

    expect(component.onAdd).toHaveBeenCalled();
  });

  it('onAdd should call console.log', () => {
    spyOn(console, 'log');
    component.onAdd();

    expect(console.log).toHaveBeenCalledWith('Add course');
  });


  it('load more should call onLoadMore', () => {
    spyOn(component, 'onLoadMore');
    const button = de.query(By.directive(LoadMoreComponent)).componentInstance;
    button.loadMore.emit();

    expect(component.onLoadMore).toHaveBeenCalled();
  });

  it('onLoadMore should call console.log', () => {
    spyOn(console, 'log');
    component.onLoadMore();

    expect(console.log).toHaveBeenCalledWith('Load more');
  });
});
