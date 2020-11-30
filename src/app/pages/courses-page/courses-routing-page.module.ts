// Core
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { CoursesPageComponent } from './courses-page.component';

const routes: Routes = [
  {
    path: '',
    component: CoursesPageComponent,
    data: { breadcrumb: 'Courses' },
    loadChildren: () =>
      import('src/app/features/courses/courses.module').then(m => m.CoursesModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoursesRoutingPageModule { }
