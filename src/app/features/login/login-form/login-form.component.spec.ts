// Core
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { HttpClientTestingModule } from '@angular/common/http/testing';

// Components
import { LoginFormComponent } from './login-form.component';
import { ButtonComponent } from 'src/app/shared/components/button/button.component';
import { InputComponent } from 'src/app/shared/components/input/input.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let de;

  const testEmail = 'email';
  const testPassword = 'password';
  const SELECTOR_BTN = 'app-button';
  const SELECTOR_EMAIL = 'app-input[name="email"]';
  const SELECTOR_PASSWORD = 'app-input[name="password"]';
  const newEmail = 'new-email';
  const newPassword = 'new-password';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [
        LoginFormComponent,
        ButtonComponent,
        InputComponent,
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;
    component.email = testEmail;
    component.password = testPassword;

    fixture.detectChanges();
    de = fixture.debugElement;
  });

  describe('Form logic', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should clean form', () => {
      component.clearForm();
      expect(component.email).toBe('');
      expect(component.password).toBe('');
    });

    it('form should be valid', () => {
      expect(component.isValid()).toBeTrue();
    });

    it('form should be invalid', () => {
      component.clearForm();
      expect(component.isValid()).toBeFalse();
    });
  });

  describe('Form events', () => {
    it('btn click should call onSubmit', () => {
      const spy = spyOn(component, 'onSubmit');
      const button = de.nativeElement.querySelector(SELECTOR_BTN);
      button.click();

      expect(spy).toHaveBeenCalled();
    });

    it('onSubmit with valid data should emit formSubmit event', () => {
      const submitData = { login: testEmail, password: testPassword };
      const spy = spyOn(component.formSubmit, 'emit');
      component.onSubmit(new Event('submit'));

      expect(spy).toHaveBeenCalledWith(submitData);
    });

    it('onSubmit with invalid data should do nothing', () => {
      const spy = spyOn(component.formSubmit, 'emit');
      component.email = '';
      component.password = '';
      component.onSubmit(new Event('submit'));

      expect(spy).not.toHaveBeenCalled();
    });

    it('email input change should call onEmailChange', () => {
      const spy = spyOn(component, 'onEmailChange');
      const input = de.query(By.css(SELECTOR_EMAIL)).componentInstance;
      input.inputChanged.emit(newEmail);

      expect(spy).toHaveBeenCalledWith(newEmail);
    });

    it('onEmailChange should set email', () => {
      component.onEmailChange(newEmail);
      expect(component.email).toBe(newEmail);
    });

    it('password input change should call onPasswordChange', () => {
      const spy = spyOn(component, 'onPasswordChange');
      const input = de.query(By.css(SELECTOR_PASSWORD)).componentInstance;
      input.inputChanged.emit(newPassword);

      expect(spy).toHaveBeenCalledWith(newPassword);
    });

    it('onPasswordChange should set password', () => {
      component.onPasswordChange(newPassword);
      expect(component.password).toBe(newPassword);
    });
  });
});
