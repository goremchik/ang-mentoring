// Core
import { TestBed } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';

// Guards
import { AuthGuard, AUTH_URL } from './auth.guard';

// Store
import * as userSelectors from 'src/app/core/store/user/user.selectors';

// Mocks
import { user } from 'src/app/mock';

describe('AuthGuard', () => {
  let service: AuthGuard;
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
    service = TestBed.inject(AuthGuard);
    store = TestBed.inject(MockStore);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should allow redirect when logged in', () => {
    store.overrideSelector(userSelectors.getUser, user);
    store.refreshState();

    service.canActivate().subscribe((data) => {
      expect(data).toEqual(true);
    });
  });

  it('should redirect to auth when not logged in', () => {
    service.canActivate().subscribe((data) => {
      expect(data).toEqual(service.router.parseUrl(AUTH_URL));
    });
  });
});
