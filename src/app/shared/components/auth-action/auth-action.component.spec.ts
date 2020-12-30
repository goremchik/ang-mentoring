// Core
import { async, ComponentFixture, TestBed, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { TranslateModule } from '@ngx-translate/core';

// Components
import { AuthActionComponent } from './auth-action.component';

// Mocks
import { user } from 'src/app/mock';

// Store
import * as userActions from 'src/app/core/store/user/user.actions';
import * as userSelectors from 'src/app/core/store/user/user.selectors';

describe('AuthActionComponent', () => {
  let component: AuthActionComponent;
  let fixture: ComponentFixture<AuthActionComponent>;
  let de;
  let store: MockStore;

  const SELECTOR_LOGOUT = '.logout';
  const SELECTOR_LOGIN = '.login';
  const initialState = {
    user: {
      profile: null
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AuthActionComponent ],
      imports: [ TranslateModule.forRoot() ],
      providers: [
        provideMockStore({ initialState }),
        { provide: ComponentFixtureAutoDetect, useValue: true },
      ],
    })
    .compileComponents();
    store = TestBed.inject(MockStore);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthActionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onLogoutClick', () => {
    const spy = spyOn(component, 'onLogoutClick');
    store.overrideSelector(userSelectors.getUser, user);
    store.refreshState();
    fixture.detectChanges();

    const logout = de.nativeElement.querySelector(SELECTOR_LOGOUT);
    logout.click();
    expect(spy).toHaveBeenCalled();
  });

  it('onLogoutClick should logout', () => {
    const spy = spyOn(component.store$, 'dispatch');
    store.overrideSelector(userSelectors.getUser, user);
    store.refreshState();
    fixture.detectChanges();

    component.onLogoutClick();
    expect(spy).toHaveBeenCalledWith(userActions.logout());
  });

  it('should show login link', () => {
    const login = de.nativeElement.querySelector(SELECTOR_LOGIN);
    expect(login).toBeTruthy();
  });

  it('should show logout link', () => {
    store.overrideSelector(userSelectors.getUser, user);
    store.refreshState();
    fixture.detectChanges();

    const logout = de.nativeElement.querySelector(SELECTOR_LOGOUT);
    expect(logout).toBeTruthy();
  });
});
