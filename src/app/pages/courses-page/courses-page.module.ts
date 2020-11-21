// Core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Modules
import { CoursesRoutingPageModule } from './courses-routing-page.module';
import { SharedModule } from '../../shared/shared.module';

// Components
import { CoursesPageComponent } from './courses-page.component';

@NgModule({
  declarations: [ CoursesPageComponent ],
  imports: [
    CommonModule,
    RouterModule,
    CoursesRoutingPageModule,
    SharedModule,
  ],
})
export class CoursesPageModule { }
