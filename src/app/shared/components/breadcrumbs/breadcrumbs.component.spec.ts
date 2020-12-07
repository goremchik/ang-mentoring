// Core
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

// Components
import { BreadcrumbsComponent } from './breadcrumbs.component';

// Mocks
import { breadcrumbs as breadcrumbsMock, courses } from 'src/app/mock';

// Models
import { BreadcrumbModel } from 'src/app/core';

// Services
import { COURSES_SERVICE_TOKEN, CourseService } from 'src/app/core/services/courses/courses.service';

describe('BreadcrumbsComponent', () => {
  let component: BreadcrumbsComponent;
  let fixture: ComponentFixture<BreadcrumbsComponent>;

  const title = 'Video Course 1';
  const [breadcrumbParent, breadcrumbBare] = breadcrumbsMock;

  const activatedRouteStub = {
    root: {
      children: [{
        snapshot: {
          data: { breadcrumb: breadcrumbParent.label },
          url: [{ path: 'courses' }],
        },
        children: [{
          snapshot: {
            data: { breadcrumb: breadcrumbBare.label, service: COURSES_SERVICE_TOKEN },
            url: [{ path: '1' }],
            params: { id : '1' }
          },
          children: [],
        }],
      }],
    },
  };

  const breadcrumbs: BreadcrumbModel[] = [
    { ...breadcrumbParent },
    { ...breadcrumbBare, label: of(title) }
  ];

  const SELECTOR_BREADCRUMB = '.breadcrumbs__item';
  const SELECTOR_CURRENT_BREADCRUMB = '.breadcrumbs__link--selected';
  const SELECTOR_LINK = '.breadcrumbs__link';

  const obj: Partial<CourseService> = {
    getItemById: () => of(courses[0])
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule, HttpClientTestingModule ],
      declarations: [BreadcrumbsComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: COURSES_SERVICE_TOKEN, useValue: obj },
      ],
    })
      .compileComponents();
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
    expect(links.length).toEqual(breadcrumbsMock.length);
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
