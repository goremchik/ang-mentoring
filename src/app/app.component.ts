// Core
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';

// Store
import * as userActions from './core/store/user/user.actions';

const defaultLang = 'en'
const availableLanguages = [ 'en','ru' ];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private store$: Store, translate: TranslateService) {
    translate.addLangs(availableLanguages);
    translate.setDefaultLang(defaultLang);
    translate.use(defaultLang);
  }

  ngOnInit() {
    this.store$.dispatch(userActions.loadProfile());
  }
}
