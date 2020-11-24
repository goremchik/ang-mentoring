// Core
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';

// Components
import { BreadcrumbsComponent } from './breadcrumbs.component';

// Mocks
import { breadcrumbs as breadcrumbsMock } from 'src/app/mock';

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
    { ...breadcrumbBare, label: title }
  ];

  const SELECTOR_LINK = '.breadcrumbs__item';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [BreadcrumbsComponent],
      providers: [
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: COURSES_SERVICE_TOKEN, useClass: CourseService },
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

  it('should init breadcrumbs and get breadcrumb from title', () => {
    expect(component.breadcrumbs).toEqual(breadcrumbs);
  });
});
