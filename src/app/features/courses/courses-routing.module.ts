// Core
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { CoursesContainerComponent } from './courses-container/courses-container.component';
import { AddCourseContainerComponent } from './add-course-container/add-course-container.component';

// Store
import * as coursesSelectors from 'src/app/core/store/courses/courses.selectors';

const routes: Routes = [
  {
    path: '',
    component: CoursesContainerComponent,
    data: { breadcrumb: null },
  },
  {
    path: 'new',
    component: AddCourseContainerComponent,
    data: { breadcrumb: 'New Course' },
  },
  {
    path: ':id',
    component: AddCourseContainerComponent,
    data: { breadcrumb: '{{title}}', selector: coursesSelectors.getItemById },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule { }
