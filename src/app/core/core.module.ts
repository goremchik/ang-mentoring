// Core
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Interceptors
import { AuthInterceptor } from './interceptors/auth.interceptor';

// Store
import { reducers } from './store';
import { CoursesEffects } from './store/courses/courses.effects';
import { UserEffects } from './store/user/user.effects';

// Other
import { environment } from '../../environments/environment';

// AoT requires an exported function for factories
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    StoreRouterConnectingModule.forRoot(),
    TranslateModule.forRoot({ 
      defaultLanguage: 'en',
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
    }),
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: environment.production }),
    StoreModule.forRoot(reducers),
    EffectsModule.forRoot([
      CoursesEffects,
      UserEffects,
    ]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
})
export class CoreModule { }
