// Core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

// Components
import { LogoComponent } from './components/sctructure/logo/logo.component';
import { HeaderComponent } from './components/sctructure/header/header.component';
import { AuthActionComponent } from './components/common/auth-action/auth-action.component';
import { BreadcrumbsComponent } from './components/sctructure/breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './components/sctructure/footer/footer.component';
import { SearchComponent } from './components/common/search/search.component';
import { LoadMoreComponent } from './components/common/load-more/load-more.component';
import { PageItemComponent } from './components/sctructure/page-item/page-item.component';
import { ButtonComponent } from './components/form/button/button.component';
import { AutocompleteInputComponent } from './components/form/autocomplete-input/autocomplete-input.component';
import { DurationInputComponent } from './components/form/duration-input/duration-input.component';
import { DatePickerComponent } from './components/form/date-picker/date-picker.component';
import { IconComponent } from './components/common/icon/icon.component';
import { DialogComponent } from './components/common/dialog/dialog.component';
import { LangSelectorComponent } from './components/common/lang-selector/lang-selector.component';

// Directives
import { DateStatusDirective } from '../shared/directives/date-status/date-status.directive';
import { DisableElDirective } from './directives/disable-el/disable-el.directive';

// Pipes
import { DurationPipe } from '../shared/pipes/duration/duration.pipe';
import { NotFoundComponent } from './components/sctructure/not-found/not-found.component';

// Services
import { LoaderComponent } from './components/sctructure/loader/loader.component';

@NgModule({
  declarations: [
    // Components
    LogoComponent,
    HeaderComponent,
    AuthActionComponent,
    BreadcrumbsComponent,
    FooterComponent,
    SearchComponent,
    LoadMoreComponent,
    PageItemComponent,
    ButtonComponent,
    AutocompleteInputComponent,
    DurationInputComponent,
    DatePickerComponent,
    IconComponent,
    DialogComponent,
    LangSelectorComponent,

    // Pipes
    DurationPipe,

    // Directives
    DateStatusDirective,
    DisableElDirective,
    NotFoundComponent,
    LoaderComponent,
    LangSelectorComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    TranslateModule,
  ],
  exports: [
    // Components
    LogoComponent,
    HeaderComponent,
    AuthActionComponent,
    BreadcrumbsComponent,
    FooterComponent,
    SearchComponent,
    LoadMoreComponent,
    PageItemComponent,
    ButtonComponent,
    AutocompleteInputComponent,
    DurationInputComponent,
    DatePickerComponent,
    IconComponent,
    DialogComponent,
    LangSelectorComponent,

    // Pipes
    DurationPipe,

    // Directives
    DateStatusDirective,
    DisableElDirective,

    TranslateModule,
  ],
})
export class SharedModule { }
