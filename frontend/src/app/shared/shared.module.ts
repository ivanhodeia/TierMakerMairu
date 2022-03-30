import { MaterialModule } from './../../material.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { SidebarComponent, MainHeaderComponent, NavBarComponent } from './layout';

@NgModule({
  declarations: [
    SidebarComponent,
    MainHeaderComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule
  ],
  exports: [
    SidebarComponent,
    MainHeaderComponent,
    NavBarComponent
  ]
})
export class SharedModule { }
