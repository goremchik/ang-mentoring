// Core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Modules
import { LoginModule } from '../../features/login/login.module';
import { AuthRoutingPageModule } from './auth-routing-page.module';

// Components
import { AuthPageComponent } from './auth-page.component';

@NgModule({
  declarations: [ AuthPageComponent ],
  imports: [
    CommonModule,
    LoginModule,
    RouterModule,
    AuthRoutingPageModule,
  ],
  exports: [ AuthPageComponent ],
})
export class AuthPageModule { }
