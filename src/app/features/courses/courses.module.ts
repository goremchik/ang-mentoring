// Core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { SharedModule } from '../../shared/shared.module';
import { CoreModule } from '../../core/core.module';

// Components
import { AddCourseComponent } from './add-course/add-course.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CourseItemComponent } from './course-item/course-item.component';
import { CoursesContainerComponent } from './courses-container/courses-container.component';
import { AddCourseFormComponent } from './add-course-form/add-course-form.component';
import { AddCourseContainerComponent } from './add-course-container/add-course-container.component';

// Services
import { CourseService } from 'src/app/core/services/courses/courses.service';

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
    CoreModule,
  ],
  exports: [
    AddCourseComponent,
    CoursesListComponent,
    CourseItemComponent,
    CoursesContainerComponent,
    AddCourseFormComponent,
    AddCourseContainerComponent,
  ],
  providers: [ CourseService ],
})
export class CoursesModule { }
