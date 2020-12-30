// Core
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';

// Components
import { BreadcrumbsComponent } from './breadcrumbs.component';

// Mocks
import { breadcrumbs, courses } from 'src/app/mock';

// Store
import * as courseSelectors from 'src/app/core/store/courses/courses.selectors';

describe('BreadcrumbsComponent', () => {
  let component: BreadcrumbsComponent;
  let fixture: ComponentFixture<BreadcrumbsComponent>;
  let store: MockStore;

  const title = 'Video Course 1';
  const [breadcrumbParent, breadcrumbBare] = breadcrumbs;

  const routerRoot = {
    data: { breadcrumb: breadcrumbParent.label },
    url: [{ path: 'courses' }],

    firstChild: {
      data: {
        breadcrumb: breadcrumbBare.label,
        selector: courseSelectors.getItemById,
      },
      url: [{ path: '1' }],
      params: { id : '1' },

      firstChild: null,
    },
  };

  const initialState = {
    router: {
      state: { root: routerRoot }
    },
    courses: { entries: courses }
  };

  const SELECTOR_BREADCRUMB = '.breadcrumbs__item';
  const SELECTOR_CURRENT_BREADCRUMB = '.breadcrumbs__link--selected';
  const SELECTOR_LINK = '.breadcrumbs__link';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, TranslateModule.forRoot() ],
      declarations: [BreadcrumbsComponent],
      providers: [ provideMockStore({ initialState }) ],
    })
      .compileComponents();

    store = TestBed.inject(MockStore);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BreadcrumbsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render all breadcrumbs', () => {
    const links = fixture.nativeElement.querySelectorAll(SELECTOR_BREADCRUMB);
    expect(links.length).toEqual(breadcrumbs.length);
  });

  it('should render id specific breadcrumb', () => {
    const item = fixture.nativeElement.querySelector(SELECTOR_CURRENT_BREADCRUMB);
    expect(item.textContent).toEqual(title);
  });

  it('should render correct link in parent breadcrumb', () => {
    const item = fixture.nativeElement.querySelector(SELECTOR_LINK);
    expect(item.getAttribute('href')).toEqual('/courses');
  });
});
