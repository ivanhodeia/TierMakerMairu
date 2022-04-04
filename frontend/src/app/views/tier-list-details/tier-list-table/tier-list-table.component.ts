import { TierList, createEmptyTierList } from './../../../core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatMenuTrigger } from '@angular/material/menu';

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
  @Output() edit: EventEmitter<number> = new EventEmitter();
  @Output() remove: EventEmitter<number> = new EventEmitter();

  onPictureDroppped(event: CdkDragDrop<string[]>) {
    this.pictureDrop.emit(event);
  }

  onEditRowButtonClicked(i: number) {
    this.edit.emit(i);
  }

  onRemoveRowButtonClicked(i: number) {
    this.remove.emit(i);
  }
}
