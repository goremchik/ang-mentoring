// Core
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { CoursesContainerComponent } from './courses-container/courses-container.component';
import { AddCourseContainerComponent } from './add-course-container/add-course-container.component';

// Services
import { AuthGuard } from 'src/app/core/guards/auth-guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: CoursesContainerComponent,
    data: { breadcrumb: '', title: 'Courses' },
    canActivate: [AuthGuard],
  },
  {
    path: 'new',
    component: AddCourseContainerComponent,
    data: { breadcrumb: 'New Course', title: 'New Course' },
    canActivate: [AuthGuard],
  },
  {
    path: ':id',
    component: AddCourseContainerComponent,
    data: { breadcrumb: '{{title}}',  title: '' },
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
