// Core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { CoursesPageModule } from './courses-page/courses-page.module';
import { LoginPageModule } from './login-page/login-page.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    CoursesPageModule,
    LoginPageModule,
  ],
  exports: [
    CoursesPageModule
  ],
})
export class PagesModule { }
