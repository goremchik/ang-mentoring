// Core
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { NotFoundComponent } from './shared/components/sctructure/not-found/not-found.component';

// Services
import { AuthGuard } from './core/guards/auth-guard/auth.guard';
import { LoggedGuard } from './core/guards/logged-guard/logged.guard';

const routes: Routes = [
  { path: '', redirectTo: '/courses', pathMatch: 'full' },
  {
    path: 'courses',
    canActivate: [ AuthGuard ],
    loadChildren: () =>
      import('./pages/courses-page/courses-page.module').then(m => m.CoursesPageModule)
  },
  {
    path: 'auth',
    canActivate: [ LoggedGuard ],
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
