import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AngularMaterialModule } from './../../../angular-material.module';
import { FormsModule } from '@angular/forms';
import { TierCardComponent } from './tier-card/tier-card.component';
import { NgModule } from '@angular/core';
import { TierListPage } from './tier-list.component';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
    TierCardComponent,
    TierListPage,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ]
})
export class TierListModule { }
