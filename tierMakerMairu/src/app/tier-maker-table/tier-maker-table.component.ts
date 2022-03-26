import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { TierMakerElement } from '../models/tier-maker-element.model';

@Component({
  selector: '[tier-maker-table]',
  templateUrl: './tier-maker-table.component.html',
  styleUrls: ['./tier-maker-table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TierMakerTableComponent {
  @Input() displayedColumns: Array<string> = [];
  @Input() dataSource: Array<TierMakerElement> = [];
  @Input() allListIds: Array<string> = [];
  @Output() pictureDrop: EventEmitter<any> = new EventEmitter();
  @Output() editTier: EventEmitter<string> = new EventEmitter();

  @Output() swapUp: EventEmitter<string> = new EventEmitter();
  @Output() swapDown: EventEmitter<string> = new EventEmitter();

  onEditTierButtonClicked(id: string){
    this.editTier.emit(id);
  }

  onPictureDroppped(event: CdkDragDrop<string[]>) {
    console.log("Dropped in Tier Maker Table");
    this.pictureDrop.emit(event);
  }

  getCurrentId(element: TierMakerElement) {
    return element.id;
  }

  getConnectedLists(currentId: string) {
    return this.allListIds.filter(value => value != currentId);
  }

  onSwapButtonClicked(id: string, isUp: boolean) {
    if(isUp){
      this.swapUp.emit(id);
    }
    else{
      this.swapDown.emit(id);
    }
  }
}
