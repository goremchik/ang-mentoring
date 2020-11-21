// Core
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

export interface BreadcrumbModel {
  label: string;
  url: string;
}

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit, OnDestroy {

  static readonly ROUTE_DATA_BREADCRUMB = 'breadcrumb';
  breadcrumbs: BreadcrumbModel[];
  breadcrumbsSubscription: Subscription;
  regexp = /{{(.*?)}}/g;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
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

      if (!!label) {
        if (this.checkId(label)) {
          label = this.replaceId(label, child);
        }

        breadcrumbs.push({label, url});
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

  private replaceId(str: string, route: ActivatedRoute): string {
    const { id } = route.snapshot.params;

    return str.replace(this.regexp, id);
  }
}
