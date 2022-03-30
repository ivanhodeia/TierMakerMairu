import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPage } from './views/login/login.component';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { APP_INITIALIZER, ModuleWithProviders, NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/material.module';
import { TierListGridModule, TierListDetailsModule } from './views';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { TokenInterceptor, AuthService, AuthGuard } from './core';
@NgModule({
  declarations: [
    LoginPage,
    AppComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    TierListGridModule,
    TierListDetailsModule
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 2500} },
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: APP_INITIALIZER,
      useFactory: authInitializer,
      multi: true,
      deps: [AuthService]
    },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function authInitializer(authService: AuthService) {
  return () => authService.init();
}

