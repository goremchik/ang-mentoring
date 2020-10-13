import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../../shared/shared.module';
import { AddCourseComponent } from './add-course/add-course.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CourseItemComponent } from './course-item/course-item.component';
import { CoursesContainerComponent } from './courses-container/courses-container.component';

@NgModule({
  declarations: [
    AddCourseComponent,
    CoursesListComponent,
    CourseItemComponent,
    CoursesContainerComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
  ],
  exports: [
    AddCourseComponent,
    CoursesListComponent,
    CourseItemComponent,
    CoursesContainerComponent,
  ],
})
export class CoursesModule { }
