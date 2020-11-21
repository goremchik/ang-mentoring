// Core
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// components
import { AuthPageComponent } from './auth-page.component';

const routes: Routes = [
  {
    path: '',
    component: AuthPageComponent,
    loadChildren: () =>
      import('src/app/features/login/login.module').then(m => m.LoginModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingPageModule { }
