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
import { CardRendererComponent } from './card-renderer/card-renderer.component';
import { TierListListComponent } from './tier-list-list/tier-list-list.component';

@NgModule({
  declarations: [
    PicturesGridComponent,
    TierMakerTableComponent,
    CardRendererComponent,
    TierModalComponent,
    TierListListComponent,
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
