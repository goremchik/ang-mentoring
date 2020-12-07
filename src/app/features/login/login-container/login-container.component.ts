// Core
import {
  Component, ViewChild, OnInit, ChangeDetectorRef, ChangeDetectionStrategy
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { HttpErrorResponse } from '@angular/common/http';

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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginContainerComponent implements OnInit {
  errorText = '';
  @ViewChild(LoginFormComponent) form: LoginFormComponent;

  constructor(
    public authService: AuthenticationService,
    public router: Router,
    public titleService: Title,
    public activatedRoute: ActivatedRoute,
    private ref: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle(routeUtils.getTitle(this.activatedRoute));
  }

  handleError = (err: HttpErrorResponse): void => {
    this.errorText = err.error;
    this.ref.markForCheck();
  }

  handleSuccess = (): void => {
    this.form.clearForm();
    this.router.navigate(['/']);
  }

  onFormSubmit(authData: IAuth): void {
    this.errorText = '';
    this.authService.login(authData)
      .subscribe(this.handleSuccess, this.handleError);
  }
}
