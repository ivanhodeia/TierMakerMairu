import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { MainHeaderComponent } from './layout/main-header/main-header.component';
import { NavBarComponent } from './layout/nav-bar/nav-bar.component';
import { MaterialModule } from './../../material.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

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
