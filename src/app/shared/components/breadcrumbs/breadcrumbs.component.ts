// Core
import { Component, OnInit } from '@angular/core';

// Mocks
import { breadcrumbs } from '../../../mock';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})
export class BreadcrumbsComponent implements OnInit {
  breadcrumbs: string[];

  ngOnInit(): void {
    this.breadcrumbs = breadcrumbs;
  }
}
