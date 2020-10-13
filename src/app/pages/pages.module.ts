import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CoursesPageModule } from './courses-page/courses-page.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CoursesPageModule,
  ],
  exports: [
    CoursesPageModule
  ],
})
export class PagesModule { }
