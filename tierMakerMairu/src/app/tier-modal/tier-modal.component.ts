import { Component, Input, Output, EventEmitter, SimpleChanges, OnChanges, Inject } from '@angular/core';
import { getEmptyTierMakerElement, TierMakerElement } from '../tier-maker-element.model';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-tier-modal',
  templateUrl: './tier-modal.component.html',
  styleUrls: ['./tier-modal.component.scss']
})
export class TierModalComponent {
  tierToEdit: TierMakerElement = getEmptyTierMakerElement();

  isEdit: boolean = false;
  modalTitle: string = "";
  isValid: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.tierToEdit = data.tierToEdit;
    console.log("Hey", this.tierToEdit);
    this.isEdit = false;
      this.modalTitle = "New Tier";
      if(this.tierToEdit.position != -1){
        this.isEdit = true;
        this.modalTitle = "Edit Tier";
        this.isValid = true;
      }
  }

  onNameChanged(){
    if(this.tierToEdit.name.trim()){
      this.isValid = true;
    }
    else{
      this.isValid = false;
    }
  }
}
