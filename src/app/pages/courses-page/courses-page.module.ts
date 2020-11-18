// Core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Modules
import { CoursesModule } from 'src/app/features/courses/courses.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { CoursesRoutingPageModule } from './courses-routing-page.module';

// Components
import { CoursesPageComponent } from './courses-page.component';

@NgModule({
  declarations: [ CoursesPageComponent ],
  imports: [
    CommonModule,
    CoursesModule,
    RouterModule,
    SharedModule,
    CoursesRoutingPageModule,
  ],
  exports: [ CoursesPageComponent ]
})
export class CoursesPageModule { }
