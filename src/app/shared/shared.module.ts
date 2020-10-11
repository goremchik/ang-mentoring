import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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

@NgModule({
  declarations: [
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
  ],
  imports: [
    CommonModule,
  ],
  exports: [
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
  ],
})
export class SharedModule { }
