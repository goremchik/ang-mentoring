// Core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// Modules
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { CoursesRoutingModule } from './courses-routing.module';

// Components
import { AddCourseComponent } from './add-course/add-course.component';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CourseItemComponent } from './course-item/course-item.component';
import { CoursesContainerComponent } from './courses-container/courses-container.component';
import { AddCourseFormComponent } from './add-course-form/add-course-form.component';
import { AddCourseContainerComponent } from './add-course-container/add-course-container.component';

// Services
import { CourseService } from 'src/app/core/services/courses/courses.service';

// Interceptors
import { AuthInterceptor } from 'src/app/core/interceptors/auth.interceptor';

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
  providers: [
    CourseService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
})
export class CoursesModule { }
