// Core
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

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
import { HttpService } from 'src/app/core/services/http/http.service';

// Mocks
import { courses as coursesMock } from 'src/app/mock';

describe('CoursesContainerComponent', () => {
  let component: CoursesContainerComponent;
  let fixture: ComponentFixture<CoursesContainerComponent>;
  let de;
  let courses;

  const CourseServiceStub: Partial<CourseService> = {
    getList() {
      return of(courses);
    },
    removeItem() {
      const [ first, ...other ] = coursesMock;
      courses = other;
      return of(null);
    },
    getItemById() {
      return of(courses[0]);
    },
  };

  beforeEach(async(() => {
    courses = coursesMock;

    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule ],
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
        CourseService,
        HttpService,
        { provide: CourseService, useValue: CourseServiceStub },
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesContainerComponent);
    component = fixture.componentInstance;
    component.coursesCount = 3;
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

    it('loadCourses should get courses list', () => {
      const spy = spyOn(component.courseService, 'getList')
        .and.returnValue(of(courses));
      component.loadCourses();
      expect(spy).toHaveBeenCalled();
    });

    it('load more should call onLoadMore', () => {
      const spy = spyOn(component, 'onLoadMore');
      const button = de.query(By.directive(LoadMoreComponent)).componentInstance;
      button.loadMore.emit();

      expect(spy).toHaveBeenCalled();
    });

    it('onLoadMore should increase count and load courses', () => {
      const spy = spyOn(component, 'loadCourses');
      component.onLoadMore();

      expect(component.coursesCount).toBe(8);
      expect(spy).toHaveBeenCalled();
    });

    it('search change should call onSearchChange', () => {
      const spy = spyOn(component, 'onSearchChange');
      const search = de.query(By.directive(SearchComponent)).componentInstance;
      search.searchChange.emit(searchValue);

      expect(spy).toHaveBeenCalledWith(searchValue);
    });

    it('onSearchChange should filter courses', () => {
      const searchSpy = spyOn(component, 'loadCourses');
      component.onSearchChange(searchValue);

      expect(component.searchValue).toEqual(searchValue);
      expect(searchSpy).toHaveBeenCalled();
    });

    it('dialog confirm should call onDeleteConfirm', () => {
      const spy = spyOn(component, 'onDeleteConfirm');
      const dialog = de.query(By.directive(DialogComponent)).componentInstance;
      dialog.confirm.emit();

      expect(spy).toHaveBeenCalled();
    });

    it('onDeleteConfirm should delete course', () => {
      const spy = spyOn(component.courseService, 'removeItem')
        .and.returnValue(of(null));
      component.courseToRemove = courses[0];
      component.onDeleteConfirm();
      expect(spy).toHaveBeenCalledWith(courses[0].id);
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
