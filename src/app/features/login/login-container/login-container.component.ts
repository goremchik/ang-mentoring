// Core
import { Component, ViewChild , OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

// Models
import { IAuth } from 'src/app/core';

// Services
import { AuthenticationService } from 'src/app/core/services/authentication/authentication.service';

// Components
import { LoginFormComponent } from '../login-form/login-form.component';

// Utils
import { routeUtils } from 'src/app/utils';

@Component({
  selector: 'app-login-container',
  templateUrl: './login-container.component.html',
  styleUrls: ['./login-container.component.scss'],
})
export class LoginContainerComponent implements OnInit {
  showError = false;
  @ViewChild(LoginFormComponent) form: LoginFormComponent;

  constructor(
    public authService: AuthenticationService,
    public router: Router,
    public titleService: Title,
    public activatedRoute: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.titleService.setTitle(routeUtils.getTitle(this.activatedRoute));
  }

  onFormSubmit(authData: IAuth): void {
    // Later it will be async call
    this.authService.login(authData);
    this.form.clearForm();
    this.router.navigate(['/']);
  }
}
