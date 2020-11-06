// Core
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

// Models
import { IAuth } from 'src/app/core';

// Services
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';

// Components
import { LoginFormComponent } from '../login-form/login-form.component';

@Component({
  selector: 'app-login-container',
  templateUrl: './login-container.component.html',
  styleUrls: ['./login-container.component.scss'],
})
export class LoginContainerComponent {
  showError = false;
  @ViewChild(LoginFormComponent) form: LoginFormComponent;

  constructor(
    public authService: AuthenticationService,
    public router: Router,
  ) {}

  onFormSubmit(authData: IAuth): void {
    // Later it will be async call
    this.authService.login(authData);
    this.form.clearForm();
    this.router.navigate(['/']);
  }
}
