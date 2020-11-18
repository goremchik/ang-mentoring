// Core
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { CoursesPageComponent } from './courses-page.component';

// Services
import { AuthGuard } from 'src/app/core/guards/auth-guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('src/app/features/courses/courses.module').then(m => m.CoursesModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingPageModule { }
