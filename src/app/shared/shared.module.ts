// Core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// Components
import { LogoComponent } from './logo/logo.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { BreadcrumbsComponent } from './breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './footer/footer.component';
import { SearchComponent } from './search/search.component';
import { LoadMoreComponent } from './load-more/load-more.component';
import { PageItemComponent } from './page-item/page-item.component';
import { ButtonComponent } from './button/button.component';
import { InputComponent } from './input/input.component';
import { IconComponent } from './icon/icon.component';

// Directives
import { DateStatusDirective } from '../shared/directives/date-status/date-status.directive';

// Pipes
import { DurationPipe } from '../shared/pipes/duration/duration.pipe';
import { OrderByPipe } from '../shared/pipes/order-by/order-by.pipe';
import { FilterPipe } from '../shared/pipes/filter/filter.pipe';


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

    // Pipes
    DurationPipe,
    OrderByPipe,
    FilterPipe,

    // Directives
    DateStatusDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
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

    // Pipes
    DurationPipe,
    OrderByPipe,
    FilterPipe,

    // Directives
    DateStatusDirective,
  ],
})
export class SharedModule { }
