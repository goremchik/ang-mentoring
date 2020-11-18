// Core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { CoursesModule } from '../../features/courses/courses.module';

// Components
import { AddCoursePageComponent } from './add-course-page.component';

@NgModule({
  declarations: [ AddCoursePageComponent ],
  imports: [
    CommonModule,
    CoursesModule,
  ],
  exports: [ AddCoursePageComponent ],
})
export class AddCoursePageModule { }
