import { Component, Input, Inject } from '@angular/core';
import { getEmptyTierMakerElement, TierMakerElement } from '../models/tier-maker-element.model';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-tier-modal',
  templateUrl: './tier-modal.component.html',
  styleUrls: ['./tier-modal.component.scss']
})
export class TierModalComponent {
  @Input() isEdit: boolean = false;
  tierToEdit: TierMakerElement = getEmptyTierMakerElement();

  modalTitle: string = "";
  isValid: boolean = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.tierToEdit = data.tierToEdit;
    this.isEdit = data.isEdit;
    console.log("Hey", this.tierToEdit);
    this.isEdit = false;
      this.modalTitle = "New Tier";
      if(this.isEdit){
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
