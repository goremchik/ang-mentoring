// Core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Modules
import { AuthRoutingPageModule } from './auth-routing-page.module';

// Components
import { AuthPageComponent } from './auth-page.component';

@NgModule({
  declarations: [ AuthPageComponent ],
  imports: [
    CommonModule,
    RouterModule,
    AuthRoutingPageModule,
  ],
})
export class AuthPageModule { }
