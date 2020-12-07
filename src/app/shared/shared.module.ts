// Core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Components
import { LogoComponent } from './components/logo/logo.component';
import { HeaderComponent } from './components/header/header.component';
import { AuthActionComponent } from './components/auth-action/auth-action.component';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchComponent } from './components/search/search.component';
import { LoadMoreComponent } from './components/load-more/load-more.component';
import { PageItemComponent } from './components/page-item/page-item.component';
import { ButtonComponent } from './components/button/button.component';
import { InputComponent } from './components/input/input.component';
import { AutocompleteInputComponent } from './components/autocomplete-input/autocomplete-input.component';
import { DurationInputComponent } from './components/duration-input/duration-input.component';
import { TextareaComponent } from './components/textarea/textarea.component';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { IconComponent } from './components/icon/icon.component';
import { DialogComponent } from './components/dialog/dialog.component';

// Directives
import { DateStatusDirective } from '../shared/directives/date-status/date-status.directive';
import { DisableElDirective } from './directives/disable-el/disable-el.directive';

// Pipes
import { DurationPipe } from '../shared/pipes/duration/duration.pipe';
import { OrderByPipe } from '../shared/pipes/order-by/order-by.pipe';
import { FilterPipe } from '../shared/pipes/filter/filter.pipe';
import { NotFoundComponent } from './components/not-found/not-found.component';

// Services
import { COURSES_SERVICE_TOKEN, CourseService } from '../core/services/courses/courses.service';
import { LoaderComponent } from './components/loader/loader.component';

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
    InputComponent,
    AutocompleteInputComponent,
    DurationInputComponent,
    TextareaComponent,
    DatePickerComponent,
    IconComponent,
    DialogComponent,

    // Pipes
    DurationPipe,
    OrderByPipe,
    FilterPipe,

    // Directives
    DateStatusDirective,
    DisableElDirective,
    NotFoundComponent,
    LoaderComponent,
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
    AuthActionComponent,
    BreadcrumbsComponent,
    FooterComponent,
    SearchComponent,
    LoadMoreComponent,
    PageItemComponent,
    ButtonComponent,
    InputComponent,
    AutocompleteInputComponent,
    DurationInputComponent,
    TextareaComponent,
    DatePickerComponent,
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
  providers: [{ provide: COURSES_SERVICE_TOKEN, useClass: CourseService }],
})
export class SharedModule { }
