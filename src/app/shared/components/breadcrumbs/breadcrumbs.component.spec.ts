// Core
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// Components
import { BreadcrumbsComponent } from './breadcrumbs.component';

// Mocks
import { breadcrumbs } from '../../../mock';

describe('BreadcrumbsComponent', () => {
  let component: BreadcrumbsComponent;
  let fixture: ComponentFixture<BreadcrumbsComponent>;

  const SELECTOR_LINK = '.breadcrumbs__item';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BreadcrumbsComponent ]
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

  it('should init breadcrumbs', () => {
    expect(component.breadcrumbs).toEqual(breadcrumbs);
  });

  it('should render breadcrumbs', () => {
    const links = fixture.nativeElement.querySelectorAll(SELECTOR_LINK);
    expect(links.length).toEqual(1);
  });
});
