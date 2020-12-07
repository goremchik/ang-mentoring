import { async, ComponentFixture, TestBed, ComponentFixtureAutoDetect } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AuthActionComponent } from './auth-action.component';

describe('AuthActionComponent', () => {
  let component: AuthActionComponent;
  let fixture: ComponentFixture<AuthActionComponent>;
  let de;

  const SELECTOR_LOGOUT = '.logout';
  const SELECTOR_LOGIN = '.login';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ AuthActionComponent ],
      providers: [ { provide: ComponentFixtureAutoDetect, useValue: true } ],
    })
    .compileComponents();
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
    component.isLoggedIn = true;
    fixture.detectChanges();

    const logout = de.nativeElement.querySelector(SELECTOR_LOGOUT);
    logout.click();
    expect(spy).toHaveBeenCalled();
  });

  it('onLogoutClick should logout', () => {
    const spy = spyOn(component.authService, 'logout');
    component.onLogoutClick();
    expect(spy).toHaveBeenCalled();
  });

  it('should show login link', () => {
    const login = de.nativeElement.querySelector(SELECTOR_LOGIN);
    expect(login).toBeTruthy();
  });

  it('should show logout link', () => {
    component.isLoggedIn = true;
    fixture.detectChanges();

    const logout = de.nativeElement.querySelector(SELECTOR_LOGOUT);
    expect(logout).toBeTruthy();
  });
});
