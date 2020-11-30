// Core
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

// Services
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';

// Components
import { LoginContainerComponent } from './login-container.component';
import { LoginFormComponent } from '../login-form/login-form.component';

describe('LoginContainerComponent', () => {
  let component: LoginContainerComponent;
  let fixture: ComponentFixture<LoginContainerComponent>;
  let de;

  const userData = { email: 'e', password: 'p' };
  const AuthenticationServiceStub: Partial<AuthenticationService> = {
    login: async () => userData,
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      declarations: [ LoginContainerComponent, LoginFormComponent ],
      providers: [
        { provide: AuthenticationService, useValue: AuthenticationServiceStub }
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    de = fixture.debugElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('formSubmit should call onFormSubmit', () => {
    const spy = spyOn(component, 'onFormSubmit');

    const form = de.query(By.directive(LoginFormComponent)).componentInstance;
    form.formSubmit.emit(userData);

    expect(spy).toHaveBeenCalledWith(userData);
  });

  it('onFormSubmit should login, clear form and redirect to home page', () => {
    const spyLogin = spyOn(component.authService, 'login');
    const spyClear = spyOn(component.form, 'clearForm');
    const spyNavigate = spyOn(component.router, 'navigate');

    component.onFormSubmit(userData);

    expect(spyLogin).toHaveBeenCalledWith(userData);
    expect(spyClear).toHaveBeenCalled();
    expect(spyNavigate).toHaveBeenCalledWith(['/']);
  });
});
