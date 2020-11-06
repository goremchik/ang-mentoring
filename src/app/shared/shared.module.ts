// Core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Components
import { LogoComponent } from './components/logo/logo.component';
import { HeaderComponent } from './components/header/header.component';
import { LoginComponent } from './components/login/login.component';
import { LogoutComponent } from './components/logout/logout.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchComponent } from './components/search/search.component';
import { LoadMoreComponent } from './components/load-more/load-more.component';
import { PageItemComponent } from './components/page-item/page-item.component';
import { ButtonComponent } from './components/button/button.component';
import { InputComponent } from './components/input/input.component';
import { IconComponent } from './components/icon/icon.component';
import { DialogComponent } from './components/dialog/dialog.component';

// Directives
import { DateStatusDirective } from '../shared/directives/date-status/date-status.directive';

// Pipes
import { DurationPipe } from '../shared/pipes/duration/duration.pipe';
import { OrderByPipe } from '../shared/pipes/order-by/order-by.pipe';
import { FilterPipe } from '../shared/pipes/filter/filter.pipe';
import { DisableElDirective } from './directives/disable-el/disable-el.directive';

@NgModule({
  declarations: [
    // Components
    LogoComponent,
    HeaderComponent,
    LoginComponent,
    LogoutComponent,
    BreadcrumbsComponent,
    FooterComponent,
    SearchComponent,
    LoadMoreComponent,
    PageItemComponent,
    ButtonComponent,
    InputComponent,
    IconComponent,
    DialogComponent,

    // Pipes
    DurationPipe,
    OrderByPipe,
    FilterPipe,

    // Directives
    DateStatusDirective,

    DisableElDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
  ],
  exports: [
    // Components
    LogoComponent,
    HeaderComponent,
    LoginComponent,
    LogoutComponent,
    BreadcrumbsComponent,
    FooterComponent,
    SearchComponent,
    LoadMoreComponent,
    PageItemComponent,
    ButtonComponent,
    InputComponent,
    IconComponent,
    DialogComponent,

    // Pipes
    DurationPipe,
    OrderByPipe,
    FilterPipe,

    // Directives
    DateStatusDirective,
  ],
})
export class SharedModule { }
