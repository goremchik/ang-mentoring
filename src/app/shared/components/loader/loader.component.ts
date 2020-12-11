// Core
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store, select } from '@ngrx/store';

// Store
import * as globalSelectors from 'src/app/core/store/global/global.selectors';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss'],
})
export class LoaderComponent implements OnInit {
  isShown$: Observable<boolean>;

  constructor(public store$: Store) { }

  ngOnInit(): void {
    this.isShown$ = this.store$.pipe(select(globalSelectors.getLoaderStatus));
  }
}
