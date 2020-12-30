// Core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
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
    ReactiveFormsModule,
    RouterModule,
    LoginRoutingModule,
  ],
  exports: [
    LoginFormComponent,
    LoginContainerComponent
  ],
})
export class LoginModule { }
