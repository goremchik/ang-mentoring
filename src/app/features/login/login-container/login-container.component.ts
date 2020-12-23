// Core
import { Component, ViewChild, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

// Models
import { IAuth } from 'src/app/core';

// Store
import * as userActions from 'src/app/core/store/user/user.actions';
import * as userSelectors from 'src/app/core/store/user/user.selectors';

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
  errorText$: Observable<string>;
  @ViewChild(LoginFormComponent) form: LoginFormComponent;

  constructor(
    public store$: Store,
    public titleService: Title,
    public activatedRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.titleService.setTitle(routeUtils.getTitle(this.activatedRoute));
    this.errorText$ = this.store$.select(userSelectors.getError);
  }

  onFormSubmit(authData: IAuth): void {
    this.store$.dispatch(userActions.login(authData))
  }
}
