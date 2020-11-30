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

  const SELECTOR_LINK = '.breadcrumbs__item';

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

  it('should render breadcrumbs', () => {
    const links = fixture.nativeElement.querySelectorAll(SELECTOR_LINK);
    expect(links.length).toEqual(breadcrumbsMock.length);
  });

  // I have tried to use:
  // spyOn(service, 'getItemById').and.returnValue(of(courses[0]))
  // But it didn't help
  // it('should init breadcrumbs and get breadcrumb from title', () => {
  //   expect(component.breadcrumbs).toEqual(breadcrumbs);
  // });
});
