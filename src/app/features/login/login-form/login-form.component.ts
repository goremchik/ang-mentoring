// Core
import { Component, Output, EventEmitter } from '@angular/core';

// Models
import { IAuth } from '../../../core';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {
  @Output() formSubmit = new EventEmitter<IAuth>();

  email = '';
  password = '';

  isValid(): boolean {
    return !!this.email && !!this.password;
  }

  onSubmit(e: Event): boolean {
    e.preventDefault();

    if (!this.isValid()) {
      return false;
    }

    this.formSubmit.emit({
      email: this.email,
      password: this.password,
    });
    return true;
  }

  onEmailChange(value): void {
    this.email = value;
  }

  onPasswordChange(value): void {
    this.password = value;
  }

  clearForm(): void {
    this.email = '';
    this.password = '';
  }
}
