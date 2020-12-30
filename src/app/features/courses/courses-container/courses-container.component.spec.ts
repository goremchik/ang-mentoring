// Core
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

// Components
import { CoursesContainerComponent, ITEMS_TO_ADD } from './courses-container.component';
import { CoursesListComponent } from '../courses-list/courses-list.component';
import { AddCourseComponent } from '../add-course/add-course.component';
import { LoadMoreComponent } from 'src/app/shared/components/common/load-more/load-more.component';
import { SearchComponent } from 'src/app/shared/components/common/search/search.component';
import { DialogComponent } from 'src/app/shared/components/common/dialog/dialog.component';

// Mocks
import { courses } from 'src/app/mock';

// Store
import * as coursesSelectors from 'src/app/core/store/courses/courses.selectors';
import * as coursesActions from 'src/app/core/store/courses/courses.actions';

describe('CoursesContainerComponent', () => {
  let component: CoursesContainerComponent;
  let fixture: ComponentFixture<CoursesContainerComponent>;
  let de;
  let store: MockStore;
  const initialState = {
    courses: {
      entries: courses,
      loadedItems: 3,
      searchValue: '',
      itemIdToDelete: null,
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        ReactiveFormsModule,
        TranslateModule.forRoot()
      ],
      declarations: [
        CoursesContainerComponent,
        CoursesListComponent,
        AddCourseComponent,
        LoadMoreComponent,
        SearchComponent,
        DialogComponent,
      ],
      providers: [ provideMockStore({ initialState }) ],
    })
    .compileComponents();
    store = TestBed.inject(MockStore);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoursesContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement;
  });


  describe('Initialization', () => {
    it('should init courses', () => {
      component.courses$.subscribe(storeCourses => {
        fixture.detectChanges();
        expect(storeCourses).toEqual(courses);
      });
    });
  });


  describe('Event listeners ', () => {
    const courseId = '1';
    const searchValue = 'description 1';

    it('remove event should call onDelete', () => {
      const spy = spyOn(component, 'onDelete');
      fixture.detectChanges();

      const list = de.query(By.directive(CoursesListComponent)).componentInstance;
      list.delete.emit(courseId);

      expect(spy).toHaveBeenCalledWith(courseId);
    });

    it('onDelete should set removed element and open dialog', () => {
      const spyDialog = spyOn(component.dialogChild, 'open');
      const spyAction = spyOn(component.store$, 'dispatch');
      fixture.detectChanges();
      component.onDelete(courseId);

      expect(spyDialog).toHaveBeenCalled();
      expect(spyAction).toHaveBeenCalledWith(
        coursesActions.setItemIdToDelete({ itemIdToDelete: courseId })
      );
    });

    it('load more should call onLoadMore', () => {
      const spy = spyOn(component, 'onLoadMore');
      fixture.detectChanges();

      const button = de.query(By.directive(LoadMoreComponent)).componentInstance;
      button.loadMore.emit();

      expect(spy).toHaveBeenCalled();
    });

    it('onLoadMore should increase count and load courses', () => {
      const spy = spyOn(component.store$, 'dispatch');
      component.onLoadMore();

      expect(spy).toHaveBeenCalledWith(
        coursesActions.addLoadedItems({ countToAdd: ITEMS_TO_ADD })
      );
    });

    it('search change should call onSearchChange', () => {
      const spy = spyOn(component, 'onSearchChange');
      const search = de.query(By.directive(SearchComponent)).componentInstance;
      search.searchChange.emit(searchValue);

      expect(spy).toHaveBeenCalledWith(searchValue);
    });

    it('onSearchChange should call next action', () => {
      const searchSpy = spyOn(component.searchSubject$, 'next');
      component.onSearchChange(searchValue);
      expect(searchSpy).toHaveBeenCalledWith(searchValue);
    });

    it('dialog confirm should call onDeleteConfirm', () => {
      const spy = spyOn(component, 'onDeleteConfirm');
      const dialog = de.query(By.directive(DialogComponent)).componentInstance;
      dialog.confirm.emit();

      expect(spy).toHaveBeenCalled();
    });

    it('onDeleteConfirm should delete course', () => {
      const spy = spyOn(component.store$, 'dispatch');
      component.onDeleteConfirm();
      expect(spy).toHaveBeenCalledWith(coursesActions.removeCourse());
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
      store.overrideSelector(coursesSelectors.getCourses, []);
      store.refreshState();
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
