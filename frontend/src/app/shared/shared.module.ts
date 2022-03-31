import { TierListDialogComponent } from './components/tier-list-dialog/tier-list-dialog.component';
import { MaterialModule } from './../../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { SidebarComponent, MainHeaderComponent, NavBarComponent } from './layout';

@NgModule({
  declarations: [
    TierListDialogComponent,
    SidebarComponent,
    MainHeaderComponent,
    NavBarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    TierListDialogComponent,
    SidebarComponent,
    MainHeaderComponent,
    NavBarComponent
  ]
})
export class SharedModule { }
