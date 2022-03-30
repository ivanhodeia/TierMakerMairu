import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginPage } from './views/login/login.component';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from 'src/material.module';
import { TierListGridModule } from './views';

@NgModule({
  declarations: [
    LoginPage,
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    TierListGridModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
