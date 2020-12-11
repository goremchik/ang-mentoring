// Core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Modules
import { SharedModule } from 'src/app/shared/shared.module';
import { LoginRoutingModule } from './login-routing.module';

// Components
import { LoginFormComponent } from './login-form/login-form.component';
import { LoginContainerComponent } from './login-container/login-container.component';

@NgModule({
  declarations: [
    LoginFormComponent,
    LoginContainerComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    LoginRoutingModule,
  ],
  exports: [
    LoginFormComponent,
    LoginContainerComponent
  ],
})
export class LoginModule { }
