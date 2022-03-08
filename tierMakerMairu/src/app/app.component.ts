import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, ViewEncapsulation } from '@angular/core';
import { TierMakerElement } from './tier-maker-element.model';

const TIER_MAKER_DATA: TierMakerElement[] = [
  {position: 1, name: 'Hydrogen', pictures: ['https://robohash.org/1d', 'https://robohash.org/1dxd']},
  {position: 2, name: 'Helium', pictures: ['https://robohash.org/1x2d', 'https://robohash.org/1dsdsds', 'https://robohash.org/1ddxdxdxd', 'https://robohash.org/1dxddddd']},
  {position: 3, name: 'Lithium', pictures: ['https://robohash.org/13d']},
  {position: 4, name: 'Beryllium', pictures: ['https://robohash.org/1ddsds']},
  // {position: 5, name: 'Boron', pictures: ['https://robohash.org/1dfdsf']},
  // {position: 6, name: 'Carbon', pictures: ['https://robohash.org/1ddsd']},
  // {position: 7, name: 'Nitrogen', pictures: ['https://robohash.org/1dsdf']},
  // {position: 8, name: 'Oxygen', pictures: ['https://robohash.org/1ddxsdfds']},
  // {position: 9, name: 'Fluorine', pictures: ['https://robohash.org/1dsss']},
  // {position: 10, name: 'Neon', pictures: ['https://robohash.org/1dxd']},
];

const PICTURES_DATA: string[] = [
  'https://robohash.org/1d',
  'https://robohash.org/1d1',
  'https://robohash.org/1d3',
  'https://robohash.org/1d4',
  'https://robohash.org/1d5',
  'https://robohash.org/1d6',
  'https://robohash.org/1d7',
  'https://robohash.org/1d8',
  'https://robohash.org/1d9',
  'https://robohash.org/1d10'
]

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  displayedColumns: string[] = ['position', 'name', 'pictures'];
  tableDataSource = TIER_MAKER_DATA;
  gridDataSource = PICTURES_DATA;

  title: string = 'Tier maker';
  description: string = 'Descripción de la tier maker.';

  onPictureDroppped(event: CdkDragDrop<string[]>) {
    console.log(event);
    let gridId = 'pictures-grid';
    if (event.previousContainer === event.container) {
      if (event.previousContainer.id == gridId) {
        moveItemInArray(this.gridDataSource, event.previousIndex, event.currentIndex);
      } else {
        let rowIdx = event.previousContainer.id[event.previousContainer.id.length - 1] as any as number - 1; // < 10
        moveItemInArray(this.tableDataSource[rowIdx as any as number].pictures, event.previousIndex, event.currentIndex);
      }

    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
