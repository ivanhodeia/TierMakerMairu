import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { TierMakerElement } from '../tier-maker-element.model';

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

  onPictureDroppped(event: CdkDragDrop<string[]>) {
    this.pictureDrop.emit(event);
  }

  getCurrentId(element: TierMakerElement) {
    return element.name + '-' + element.position;
  }

  getConnectedLists(currentId: string) {
    return this.allListIds.filter(value => value != currentId);
  }
}
