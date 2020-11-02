// Core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
