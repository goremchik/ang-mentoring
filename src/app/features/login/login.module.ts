// Core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Modules
import { SharedModule } from '../../shared/shared.module';
import { CoreModule } from '../../core/core.module';

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
    CoreModule,
  ],
  exports: [
    LoginFormComponent,
    LoginContainerComponent
  ],
})
export class LoginModule { }