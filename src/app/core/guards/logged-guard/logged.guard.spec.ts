// Core
import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';

// Guards
import { LoggedGuard, ROOT_URL } from './logged.guard';

// Store
import * as userSelectors from 'src/app/core/store/user/user.selectors';

// Mocks
import { user } from 'src/app/mock';

describe('LoggedGuard', () => {
  let service: LoggedGuard;
  let isLogin = false;
  let store: MockStore;

  const initialState = {
    user: { profile: null },
  };

  beforeEach(() => {
    isLogin = false;
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      providers: [ provideMockStore({ initialState }) ],
    });
    service = TestBed.inject(LoggedGuard);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should allow redirect when not logged in', () => {
    service.canActivate().subscribe((data) => {
      expect(data).toEqual(true);
    });
  });

  it('should redirect to root when logged in', () => {
    store.overrideSelector(userSelectors.getUser, user);
    store.refreshState();
  
    service.canActivate().subscribe((data) => {
      expect(data).toEqual(service.router.parseUrl(ROOT_URL));
    });
  });
});
