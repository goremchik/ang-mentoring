// Core
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

// Utils
import { routeUtils } from 'src/app/utils';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  breadcrumbs: string[];

  constructor(
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
  ) {}

  ngOnInit(): void {
    const title = this.titleService.getTitle();
    this.breadcrumbs = routeUtils.getBreadcrumbs(this.activatedRoute)
      .map((breadcrumb: string) => breadcrumb.replace('{{title}}', title));
  }
}
