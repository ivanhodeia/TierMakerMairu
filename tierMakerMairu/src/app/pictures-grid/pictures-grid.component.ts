import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: '[pictures-grid]',
  templateUrl: './pictures-grid.component.html',
  styleUrls: ['./pictures-grid.component.scss']
})
export class PicturesGridComponent {
  @Input() dataSource: Array<string> = [];
  @Output() pictureDrop: EventEmitter<any> = new EventEmitter();

  onPictureDroppped(event: any) {
    this.pictureDrop.emit(event);
  }
}
