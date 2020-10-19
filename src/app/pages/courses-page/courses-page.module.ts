// Core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { CoursesModule } from '../../features/courses/courses.module';

// Components
import { CoursesPageComponent } from './courses-page.component';

@NgModule({
  declarations: [
    CoursesPageComponent,
  ],
  imports: [
    CommonModule,
    CoursesModule,
  ],
  exports: [
    CoursesPageComponent,
  ]
})
export class CoursesPageModule { }
