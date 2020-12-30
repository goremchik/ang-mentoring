// Core
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

// Components
import { LoginFormComponent } from './login-form.component';
import { ButtonComponent } from 'src/app/shared/components/form/button/button.component';

describe('LoginFormComponent', () => {
  let component: LoginFormComponent;
  let fixture: ComponentFixture<LoginFormComponent>;
  let de;

  const testEmail = 'email';
  const testPassword = 'password';
  const SELECTOR_FORM = 'form';

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ ReactiveFormsModule, TranslateModule.forRoot() ],
      declarations: [ LoginFormComponent, ButtonComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    de = fixture.debugElement;
  });

  it('btn click should call onSubmit', () => {
    const spy = spyOn(component, 'onSubmit');
    const form = de.nativeElement.querySelector(SELECTOR_FORM);
    form.dispatchEvent(new Event('submit'));

    expect(spy).toHaveBeenCalled();
  });

  it('onSubmit with valid data should emit formSubmit event', () => {
    const submitData = { login: testEmail, password: testPassword };
    const spy = spyOn(component.formSubmit, 'emit');
    component.form.patchValue(submitData)
    component.onSubmit();

    expect(spy).toHaveBeenCalledWith(submitData);
  });
});
