// Core
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

// Store
import * as userActions from './core/store/user/user.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private store$: Store) {}

  ngOnInit() {
    this.store$.dispatch(userActions.loadProfile());
  }
}
