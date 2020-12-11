// Core
import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';

// Models
import { BreadcrumbModel } from 'src/app/core';

// Store
import * as routerSelector from 'src/app/core/store/router/router.selectors';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  static readonly ROUTE_DATA_BREADCRUMB = 'breadcrumb';
  breadcrumbs$: Observable<BreadcrumbModel[]>;
  regexp = /{{(.*?)}}/;

  constructor(private store$: Store) {}

  ngOnInit(): void {
    this.breadcrumbs$ = this.store$.select(routerSelector.getRouterRoot)
      .pipe(map(this.createBreadcrumbs))
  }

  public createBreadcrumbs = (route: any): BreadcrumbModel[] => {
    let breadcrumbs: BreadcrumbModel[] = [];
    let url = '';
    let child = route;
    
    while (child) {
      const routeURL = child.url.map(({ path }) => path).join('/');

      if (routeURL) {
        url += `/${routeURL}`;
      }

      const label = child.data[BreadcrumbsComponent.ROUTE_DATA_BREADCRUMB];
      let label$: string | Observable<string>;

      if (label) {
        if (this.checkId(label)) {
          const selector = child.data.selector;
          label$ = this.replaceId(label, child.params, selector);
        }
        breadcrumbs.push({ label: label$ || of(label || ''), url });
      }

      child = child.firstChild;
    };

    return breadcrumbs;
  }

  private checkId(str: string): boolean {
    return this.regexp.test(str);
  }

  private replaceId(
    str: string, params: any, selector: any
  ): string | Observable<string> {
    if (selector && params) {
      const [, key] = str.match(this.regexp);
      return this.store$.select(selector, params.id)
        .pipe(map((item) => item[key]));
    }

    return str;
  }
}
