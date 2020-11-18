// Core
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

// Components
import { CoursesContainerComponent } from './courses-container.component';
import { CoursesListComponent } from '../courses-list/courses-list.component';
import { AddCourseComponent } from '../add-course/add-course.component';
import { LoadMoreComponent } from 'src/app/shared/components/load-more/load-more.component';
import { SearchComponent } from 'src/app/shared/components/search/search.component';
import { DialogComponent } from 'src/app/shared/components/dialog/dialog.component';

// Pipes
import { OrderByPipe } from 'src/app/shared/pipes/order-by/order-by.pipe';

// Services
import { CourseService } from 'src/app/core/services/courses/courses.service';

// Mocks
import { courses } from 'src/app/mock';

describe('CoursesContainerComponent', () => {
  let component: CoursesContainerComponent;
  let fixture: ComponentFixture<CoursesContainerComponent>;
  let de;

  const CourseServiceStub: Partial<CourseService> = {
    courses,
    getList() {
      return this.courses;
    },
    removeItem() {
      const [ first, ...other ] = courses;
      this.courses = other;
    },
    getItemById() {
      return courses[0];
    },
  };

  beforeEach(async(() => {
    CourseServiceStub.courses = courses;

    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [
        // Components
        CoursesContainerComponent,
        CoursesListComponent,
        AddCourseComponent,
        LoadMoreComponent,
        SearchComponent,
        DialogComponent,

        // Pipes
        OrderByPipe,
      ],
      providers: [
        { provide: CourseService, useValue: CourseServiceStub },
        CourseService,
      ],
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
    const courseId = '1';
    const searchValue = 'description 1';

    it('remove event should call onDelete', () => {
      spyOn(component, 'onDelete');
      const list = de.query(By.directive(CoursesListComponent)).componentInstance;
      list.delete.emit(courseId);

      expect(component.onDelete).toHaveBeenCalledWith(courseId);
    });

    it('onDelete should set removed element and open dialog', () => {
      spyOn(component.dialogChild, 'open');
      component.onDelete(courseId);

      expect(component.dialogChild.open).toHaveBeenCalled();
      expect(component.courseToRemove).toEqual(courses[0]);
    });

    it('load more should call onLoadMore', () => {
      const spy = spyOn(component, 'onLoadMore');
      const button = de.query(By.directive(LoadMoreComponent)).componentInstance;
      button.loadMore.emit();

      expect(spy).toHaveBeenCalled();
    });

    it('onLoadMore should call console.log', () => {
      spyOn(console, 'log');
      component.onLoadMore();

      expect(console.log).toHaveBeenCalledWith('Load more');
    });

    it('search change should call onSearchChange', () => {
      const spy = spyOn(component, 'onSearchChange');
      const search = de.query(By.directive(SearchComponent)).componentInstance;
      search.searchChange.emit(searchValue);

      expect(spy).toHaveBeenCalledWith(searchValue);
    });

    it('onSearchChange should filter courses', () => {
      component.onSearchChange(searchValue);

      expect(component.searchValue).toEqual(searchValue);
      expect(component.courses.length).toEqual(1);
    });

    it('dialog confirm should call onDeleteConfirm', () => {
      const spy = spyOn(component, 'onDeleteConfirm');
      const dialog = de.query(By.directive(DialogComponent)).componentInstance;
      dialog.confirm.emit();

      expect(spy).toHaveBeenCalled();
    });

    it('onDeleteConfirm should delete course', () => {
      component.courseToRemove = courses[0];
      component.onDeleteConfirm();
      expect(component.courses.find(({ id }) => id === courseId)).toBeFalsy();
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
