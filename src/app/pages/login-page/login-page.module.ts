// Core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { LoginModule } from '../../features/login/login.module';

// Components
import { LoginPageComponent } from './login-page.component';

@NgModule({
  declarations: [ LoginPageComponent ],
  imports: [
    CommonModule,
    LoginModule
  ],
  exports: [ LoginPageComponent ],
})
export class LoginPageModule { }
