// Core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

// Modules
import { SharedModule } from 'src/app/shared/shared.module';
import { CoreModule } from 'src/app/core/core.module';
import { LoginRoutingModule } from './login-routing.module';

// Components
import { LoginFormComponent } from './login-form/login-form.component';
import { LoginContainerComponent } from './login-container/login-container.component';

// Interceptors
import { AuthInterceptor } from 'src/app/core/interceptors/auth.interceptor';

@NgModule({
  declarations: [
    LoginFormComponent,
    LoginContainerComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    RouterModule,
    LoginRoutingModule,
  ],
  exports: [
    LoginFormComponent,
    LoginContainerComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ]
})
export class LoginModule { }
