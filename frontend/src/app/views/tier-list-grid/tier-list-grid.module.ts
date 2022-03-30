import { MaterialModule } from './../../../material.module';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { TierListCardComponent } from './tier-list-card/tier-list-card.component';
import { TierListGridPage } from './tier-list-grid.component';

@NgModule({
  declarations: [
    TierListCardComponent,
    TierListGridPage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule
  ],
  bootstrap: [TierListGridPage]
})
export class TierListGridModule { }
