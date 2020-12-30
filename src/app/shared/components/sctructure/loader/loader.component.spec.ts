// Core
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { By } from '@angular/platform-browser';

// Components
import { LoaderComponent } from './loader.component';

// Store
import * as globalSelectors from 'src/app/core/store/global/global.selectors';

describe('LoaderComponent', () => {
  let component: LoaderComponent;
  let fixture: ComponentFixture<LoaderComponent>;
  let de;
  let store: MockStore;

  const initialState = {
    global: {
      loaderCounter: 0,
    },
  };

  const SELECTOR_LOADER = '.loader';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaderComponent ],
      providers: [ provideMockStore({ initialState }) ],
    })
    .compileComponents();

    store = TestBed.inject(MockStore);
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
    store.overrideSelector(globalSelectors.getLoaderStatus, true);
    store.refreshState();
    fixture.detectChanges();

    const loaderBlock = de.query(By.css(SELECTOR_LOADER)).componentInstance;
    expect(loaderBlock).toBeTruthy();
  });
});
