// Core
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

// Store
import * as userSelectors from 'src/app/core/store/user/user.selectors';
import * as userActions from 'src/app/core/store/user/user.actions';

// Models
import { IUser } from 'src/app/core';

@Component({
  selector: 'app-auth-action',
  templateUrl: './auth-action.component.html',
  styleUrls: ['./auth-action.component.scss'],
})
export class AuthActionComponent implements OnInit {
  user$: Observable<IUser>;

  constructor(public store$: Store) {}

  ngOnInit() {
    this.user$ = this.store$.select(userSelectors.getUser);
  }

  onLogoutClick(): void {
    this.store$.dispatch(userActions.logout());
  }
}
