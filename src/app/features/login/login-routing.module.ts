// Core
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Components
import { LoginContainerComponent } from './login-container/login-container.component';

// Services
import { AuthGuard } from 'src/app/core/guards/auth-guard/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    data: { breadcrumb: '',  title: 'Login' },
    component: LoginContainerComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
