// Core
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

// Components
import { LoaderComponent } from './loader.component';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;
  let de;

  const SELECTOR_LOADER = '.loader';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement;
  });

  it('loaded should be hidden', () => {
    const loaderBlock = de.query(By.css(SELECTOR_LOADER));
    expect(loaderBlock).toBeFalsy();
  });

  it('loaded should be shown', () => {
    component.loader.loaderStatus$$.next(true);
    fixture.detectChanges();

    const loaderBlock = de.query(By.css(SELECTOR_LOADER)).componentInstance;
    expect(loaderBlock).toBeTruthy();
  });
});
