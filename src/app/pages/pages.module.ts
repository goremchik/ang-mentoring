// Core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { CoursesPageModule } from './courses-page/courses-page.module';
import { LoginPageModule } from './login-page/login-page.module';
import { AddCoursePageModule } from './add-course-page/add-course-page.module';

@NgModule({
  imports: [
    CommonModule,
    CoursesPageModule,
    LoginPageModule,
    AddCoursePageModule,
  ],
  exports: [
    CoursesPageModule
  ],
})
export class PagesModule { }
