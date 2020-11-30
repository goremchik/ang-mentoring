// Core
import { Component, OnInit, OnDestroy, Injector, InjectionToken } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

// Models
import { BreadcrumbModel } from 'src/app/core';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {

  static readonly ROUTE_DATA_BREADCRUMB = 'breadcrumb';
  breadcrumbs: BreadcrumbModel[];
  breadcrumbsSubscription: Subscription;
  regexp = /{{(.*?)}}/;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private injector: Injector
  ) {}

  ngOnInit(): void {
    this.breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        this.breadcrumbs = this.createBreadcrumbs(this.activatedRoute.root);
      });
  }

  ngOnDestroy(): void {
    this.destroySubscription();
  }

  private createBreadcrumbs(route: ActivatedRoute, url: string = '', breadcrumbs: BreadcrumbModel[] = []): any[] {
    const children: ActivatedRoute[] = route.children;

    if (children.length === 0) {
      return breadcrumbs;
    }

    for (const child of children) {
      const routeURL: string = child.snapshot.url.map(segment => segment.path).join('/');

      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      let label: string = child.snapshot.data[BreadcrumbsComponent.ROUTE_DATA_BREADCRUMB];
      if (label) {
        if (this.checkId(label)) {
          const serviceToken = child.snapshot.data.service;
          label = this.replaceId(label, child, serviceToken);
        }

        breadcrumbs.push({ label, url });
      }

      return this.createBreadcrumbs(child, url, breadcrumbs);
    }
  }

  private destroySubscription(): void {
    if (!!this.breadcrumbsSubscription) {
      this.breadcrumbsSubscription.unsubscribe();
      this.breadcrumbsSubscription = null;
    }
  }

  private checkId(str: string): boolean {
    return this.regexp.test(str);
  }

  private replaceId(
    str: string, route: ActivatedRoute, serviceToken: InjectionToken<string>,
  ): string {
    const { id } = route.snapshot.params;
    let value = str;

    if (serviceToken) {
      const service: any = this.injector.get(serviceToken);
      const item = service.getItemById(id);
      const [, key] = str.match(this.regexp);

      if (key) {
        value = str.replace(this.regexp, item[key]);
      }
    }

    return value;
  }
}
