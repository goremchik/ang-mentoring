import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesModule } from '../../features/courses/courses.module';
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
