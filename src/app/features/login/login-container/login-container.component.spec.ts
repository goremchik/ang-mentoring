// Core
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { RouterTestingModule } from '@angular/router/testing';

// Components
import { LoginContainerComponent } from './login-container.component';
import { LoginFormComponent } from '../login-form/login-form.component';

// Store
import * as userActions from 'src/app/core/store/user/user.actions';
import * as userSelectors from 'src/app/core/store/user/user.selectors';

describe('LoginContainerComponent', () => {
  let component: LoginContainerComponent;
  let fixture: ComponentFixture<LoginContainerComponent>;
  let de;
  let store: MockStore;

  const SELECTOR_ERROR = '.login__error';
  const userData = { login: 'e', password: 'p' };
  const initialState = {
    user: {
      profile: null,
      error: '',
    },
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ LoginContainerComponent, LoginFormComponent ],
      providers: [ provideMockStore({ initialState }) ],
    })
    .compileComponents();

    store = TestBed.inject(MockStore);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement;
  });

  it('error should be hidden', () => {
    const loaderObj = de.query(By.css(SELECTOR_ERROR));
    expect(loaderObj).toBeFalsy();
  });

  it('formSubmit should call onFormSubmit', () => {
    const spy = spyOn(component, 'onFormSubmit');

    const form = de.query(By.directive(LoginFormComponent)).componentInstance;
    form.formSubmit.emit(userData);
    expect(spy).toHaveBeenCalledWith(userData);
  });

  it('onFormSubmit should login', () => {
    const spyLogin = spyOn(component.store$, 'dispatch');
    component.onFormSubmit(userData);
    expect(spyLogin).toHaveBeenCalledWith(userActions.login(userData));
  });

  it('should show error on login error', () => {
    store.overrideSelector(userSelectors.getError, 'error');
    store.refreshState();
    fixture.detectChanges();

    const loaderBlock = de.query(By.css(SELECTOR_ERROR)).componentInstance;
    expect(loaderBlock).toBeTruthy();
  });
});
