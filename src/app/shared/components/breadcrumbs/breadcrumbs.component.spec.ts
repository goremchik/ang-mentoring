// Core
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute, ActivatedRouteSnapshot } from '@angular/router';
import { Title } from '@angular/platform-browser';

// Components
import { BreadcrumbsComponent } from './breadcrumbs.component';

// Mocks
import { breadcrumbs } from 'src/app/mock';

describe('BreadcrumbsComponent', () => {
  let component: BreadcrumbsComponent;
  let fixture: ComponentFixture<BreadcrumbsComponent>;

  const title = 'Course 1';
  const [ breadcrumbParent, breadcrumbBare ] = breadcrumbs;
  const TitleServiceStub: Partial<Title> = {
    getTitle: () => title,
  };

  const activatedRouteStub = {
    snapshot: {
      data: { breadcrumb: breadcrumbBare },
    },
    parent: {
      snapshot: {
        data: { breadcrumb: breadcrumbParent },
      },
    },
  };

  const SELECTOR_LINK = '.breadcrumbs__item';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreadcrumbsComponent ],
      providers: [
        { provide: Title, useValue: TitleServiceStub },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
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
    expect(links.length).toEqual(breadcrumbs.length);
  });

  // it('should init breadcrumbs and get breadcrumb from title', () => {
  //   expect(component.breadcrumbs).toEqual([breadcrumbParent, title]);
  // });
});
