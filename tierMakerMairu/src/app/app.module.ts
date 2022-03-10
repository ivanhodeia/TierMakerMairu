import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AngularMaterialModule } from 'src/angular-material.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PicturesGridComponent } from './pictures-grid/pictures-grid.component';
import { TierMakerTableComponent } from './tier-maker-table/tier-maker-table.component';
import { TierModalComponent } from './tier-modal/tier-modal.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    PicturesGridComponent,
    TierMakerTableComponent,
    TierModalComponent,
    AppComponent
  ],
  entryComponents: [TierModalComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
