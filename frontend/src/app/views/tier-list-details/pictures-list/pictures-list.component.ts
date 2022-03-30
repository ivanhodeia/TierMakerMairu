import { CdkDragDrop } from '@angular/cdk/drag-drop';
import { Component, EventEmitter, Input, Output } from '@angular/core';

const MAX_PICTURES = 10;
@Component({
  selector: 'div[pictures-list]',
  templateUrl: './pictures-list.component.html',
  styleUrls: ['./pictures-list.component.scss']
})
export class PicturesListComponent {
  @Input() id: string = '';
  @Input() pictures: Array<string> = []
  @Input() allListIds: Array<string> = [];
  @Output() pictureDrop: EventEmitter<any> = new EventEmitter();

  onPictureDroppped(event: CdkDragDrop<string[]>) {
    this.pictureDrop.emit(event);
  }

  // getSegmentedArray() {
  //   let arr = [];
  //   for (let i=0; i<this.pictures.length; i + MAX_PICTURES) {
  //     let limit = (i + MAX_PICTURES + 1 < this.pictures.length) ? i + MAX_PICTURES + 1 : this.pictures.length;
  //     arr.push(this.pictures.slice(i, limit));
  //   }
  //   return arr
  // }
}
