// Core
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { NotFoundComponent } from './shared/components/not-found/not-found.component';

// Services
import { AuthGuard } from './core/guards/auth-guard/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: '/courses', pathMatch: 'full' },
  {
    path: 'courses',
    canActivate: [AuthGuard],
    data: { breadcrumb: 'Courses' },
    loadChildren: () =>
      import('./pages/courses-page/courses-page.module').then(m => m.CoursesPageModule)
  },
  {
    path: 'auth',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./pages/auth-page/auth-page.module').then(m => m.AuthPageModule)
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
