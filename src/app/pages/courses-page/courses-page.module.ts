import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesModule } from '../../features/courses/courses.module';
import { CoursesComponent } from './courses-page.component';

@NgModule({
  declarations: [
    CoursesComponent,
  ],
  imports: [
    CommonModule,
    CoursesModule,
  ],
  exports: [
    CoursesComponent,
  ]
})
export class CoursesPageModule { }
