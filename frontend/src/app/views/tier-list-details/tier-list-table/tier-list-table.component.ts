import { TierList, createEmptyTierList } from './../../../core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'div[tier-list-table]',
  templateUrl: './tier-list-table.component.html',
  styleUrls: ['./tier-list-table.component.scss']
})
export class TierListTableComponent {
  @Input() tierList: TierList = createEmptyTierList();
  @Input() allListIds: Array<string> = [];
  @Output() pictureDrop: EventEmitter<any> = new EventEmitter();
  @Output() moveUp: EventEmitter<number> = new EventEmitter();
  @Output() moveDown: EventEmitter<number> = new EventEmitter();

  onPictureDroppped(event: CdkDragDrop<string[]>) {
    this.pictureDrop.emit(event);
  }

  onMoveUpButtonClicked(i: number) {
    this.moveUp.emit(i);
  }

  onMoveDownButtonClicked(i: number) {
    this.moveDown.emit(i);
  }
}
