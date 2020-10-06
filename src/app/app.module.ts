import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { AppComponent } from './app.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { LogoComponent } from './shared/logo/logo.component';
import { HeaderComponent } from './shared/header/header.component';
import { LoginComponent } from './shared/login/login.component';
import { LogoutComponent } from './shared/logout/logout.component';
import { BreadcrumbsComponent } from './shared/breadcrumbs/breadcrumbs.component';
import { FooterComponent } from './shared/footer/footer.component';
import { SearchComponent } from './features/courses/search/search.component';
import { CoursesListComponent } from './features/courses/courses-list/courses-list.component';
import { CourseItemComponent } from './features/courses/course-item/course-item.component';
import { LoadMoreComponent } from './features/courses/load-more/load-more.component';
import { AddCourseComponent } from './features/courses/add-course/add-course.component';
import { PageItemComponent } from './shared/page-item/page-item.component';
import { ButtonComponent } from './shared/button/button.component';
import { InputComponent } from './shared/input/input.component';

@NgModule({
  declarations: [
    AppComponent,
    CoursesComponent,
    LogoComponent,
    HeaderComponent,
    LoginComponent,
    LogoutComponent,
    BreadcrumbsComponent,
    FooterComponent,
    SearchComponent,
    CoursesListComponent,
    CourseItemComponent,
    LoadMoreComponent,
    AddCourseComponent,
    PageItemComponent,
    ButtonComponent,
    InputComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
