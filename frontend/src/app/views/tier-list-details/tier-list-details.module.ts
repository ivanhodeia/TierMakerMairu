import { RowEditionDialogComponent } from './row-edition-dialog/row-edition-dialog.component';
import { TierListDetailsPage } from './tier-list-details.component';
import { MaterialModule } from './../../../material.module';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { TierListTableComponent } from './tier-list-table/tier-list-table.component';
import { PicturesListComponent } from './pictures-list/pictures-list.component';

@NgModule({
  declarations: [
    RowEditionDialogComponent,
    PicturesListComponent,
    TierListTableComponent,
    TierListDetailsPage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MaterialModule
  ],
  exports: [TierListDetailsPage]
})
export class TierListDetailsModule { }
