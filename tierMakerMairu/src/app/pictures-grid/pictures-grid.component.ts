import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: '[pictures-grid]',
  templateUrl: './pictures-grid.component.html',
  styleUrls: ['./pictures-grid.component.scss']
})
export class PicturesGridComponent {
  @Input() dataSource: Array<string> = [];
  @Input() picturesGridId: string = '';
  @Input() allListIds: Array<string> = [];
  @Output() pictureDrop: EventEmitter<any> = new EventEmitter();

  onPictureDroppped(event: any) {
    console.log("Dropped in Picture Grid");
    this.pictureDrop.emit(event);
  }

  getConnectedLists(currentId: string) {
    return this.allListIds.filter(value => value != currentId);
  }
}
