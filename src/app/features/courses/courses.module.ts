// Core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Modules
import { SharedModule } from 'src/app/shared/shared.module';
import { CoursesRoutingModule } from './courses-routing.module';

// Components
import { AddCourseComponent } from './add-course/add-course.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CourseItemComponent } from './course-item/course-item.component';
import { CoursesContainerComponent } from './courses-container/courses-container.component';
import { AddCourseFormComponent } from './add-course-form/add-course-form.component';
import { AddCourseContainerComponent } from './add-course-container/add-course-container.component';

@NgModule({
  declarations: [
    AddCourseComponent,
    CoursesListComponent,
    CourseItemComponent,
    CoursesContainerComponent,
    AddCourseFormComponent,
    AddCourseContainerComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    CoursesRoutingModule,
  ],
  exports: [
    AddCourseComponent,
    CoursesListComponent,
    CourseItemComponent,
    CoursesContainerComponent,
    AddCourseFormComponent,
    AddCourseContainerComponent,
  ],
})
export class CoursesModule { }
