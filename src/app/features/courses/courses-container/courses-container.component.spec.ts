// Core
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

// Components
import { CoursesContainerComponent } from './courses-container.component';
import { CoursesListComponent } from '../courses-list/courses-list.component';
import { AddCourseComponent } from '../add-course/add-course.component';
import { LoadMoreComponent } from '../../../shared/load-more/load-more.component';
import { SearchComponent } from '../../../shared/search/search.component';

// Pipes
import { OrderByPipe } from '../../../shared/pipes/order-by/order-by.pipe';

// Mocks
import { courses } from '../../../mock';

describe('CoursesContainerComponent', () => {
  let component: CoursesContainerComponent;
  let fixture: ComponentFixture<CoursesContainerComponent>;
  let de;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        // Components
        CoursesContainerComponent,
        CoursesListComponent,
        AddCourseComponent,
        LoadMoreComponent,
        SearchComponent,

        // Pipes
        OrderByPipe,
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


  describe('Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should init courses', () => {
      expect(component.courses).toEqual(courses);
    });
  });


  describe('Event listeners ', () => {
    const courseId = courses[0].id;
    const searchValue = 'description 1';

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

    it('search change should call onSearchChange', () => {
      spyOn(component, 'onSearchChange');
      const search = de.query(By.directive(SearchComponent)).componentInstance;
      search.searchChange.emit(searchValue);

      expect(component.onSearchChange).toHaveBeenCalledWith(searchValue);
    });

    it('onSearchChange should filter courses', () => {
      component.onSearchChange(searchValue);

      expect(component.searchValue).toEqual(searchValue);
      expect(component.courses.length).toEqual(1);
    });
  });


  describe('Structure', () => {
    const SELECTOR_LIST = 'app-courses-list';
    const SELECTOR_LOAD_BTN = 'app-load-more';
    const SELECTOR_NO_MSG = '.courses__no-msg';

    it('should render courses list and load more button', () => {
      return fixture.whenStable().then(() => {
        const list = fixture.nativeElement.querySelector(SELECTOR_LIST);
        const loadBtn = fixture.nativeElement.querySelector(SELECTOR_LOAD_BTN);
        const noMsg = fixture.nativeElement.querySelector(SELECTOR_NO_MSG);

        expect(list).toBeTruthy();
        expect(loadBtn).toBeTruthy();
        expect(noMsg).toBeFalsy();
      });
    });

    it('should render no courses msg', () => {
      component.courses = [];
      fixture.detectChanges();

      return fixture.whenStable().then(() => {
        const list = fixture.nativeElement.querySelector(SELECTOR_LIST);
        const loadBtn = fixture.nativeElement.querySelector(SELECTOR_LOAD_BTN);
        const noMsg = fixture.nativeElement.querySelector(SELECTOR_NO_MSG);

        expect(noMsg).toBeTruthy();
        expect(list).toBeFalsy();
        expect(loadBtn).toBeFalsy();
      });
    });
  });
});
