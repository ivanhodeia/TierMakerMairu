import { TierList, createEmptyTierList } from './../../../core';
import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'div[tier-list-table]',
  templateUrl: './tier-list-table.component.html',
  styleUrls: ['./tier-list-table.component.scss']
})
export class TierListTableComponent {
  @Input() tierList: TierList = createEmptyTierList();

  getArrayFromNumber(n: number) {
    return new Array(n).fill(0);
  }
}
