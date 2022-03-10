import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { getEmptyTierMakerElement, TierMakerElement } from './tier-maker-element.model';
import { TierModalComponent } from './tier-modal/tier-modal.component';

const TIER_MAKER_DATA: TierMakerElement[] = [
  {position: 1, color:'#ff0000', name: 'Hydrogen', pictures: ['https://robohash.org/1d', 'https://robohash.org/1dxd']},
  {position: 2, color:'#001eff', name: 'Helium', pictures: ['https://robohash.org/1x2d', 'https://robohash.org/1dsdsds', 'https://robohash.org/1ddxdxdxd', 'https://robohash.org/1dxddddd']},
  {position: 3, color:'#00ffd5', name: 'Lithium', pictures: ['https://robohash.org/13d']},
  {position: 4, color:'#14FF00', name: 'Beryllium', pictures: ['https://robohash.org/1ddsds']},
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

const PICTURES_GRID_ID: string = 'pictures-grid';

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
  picturesGridId = PICTURES_GRID_ID;

  title: string = 'Tier maker';
  description: string = 'Descripción de la tier maker.';

  selectedTier: TierMakerElement = getEmptyTierMakerElement();

  constructor(public dialog: MatDialog) {}

  getAllListIds() {
    let l = [this.picturesGridId];
    for (let element of this.tableDataSource) {
      l.push(element.name + '-' + element.position);
    }
    return l;
  }

  onPictureDroppped(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  onAddTierButtonClicked() {
    this.selectedTier = getEmptyTierMakerElement();
    this.openDialog();
  }

  onEditTierButtonClicked(selectedPosition: number) {
    let currentTier = this.tableDataSource.find( (tierInfo) => {
      return tierInfo.position === selectedPosition;
    });
    if(currentTier){
      this.selectedTier = {...currentTier};
      this.openDialog();
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(TierModalComponent, {data: {tierToEdit: this.selectedTier}});
  
    dialogRef.afterClosed().subscribe(result => {
      if(result.data){
        let currentTier = result.data;
        if(result.isDelete){
          this.onTierDeleted(currentTier);
        }
        else{
          if(currentTier.position == -1){
            this.onNewTierAdded(currentTier);
          }
          else{
            this.onExistingTierEdited(currentTier);
          }
        }
      }
    });
  }

  onNewTierAdded(tierToAdd: TierMakerElement) {
    tierToAdd.position = this.tableDataSource.length+1;
    let newData = [...this.tableDataSource];
    newData.push(tierToAdd);
    this.tableDataSource = newData;
  }

  onExistingTierEdited(tierToModify: TierMakerElement) {
    let newData = [...this.tableDataSource];
    newData[tierToModify.position-1] = {...tierToModify} as TierMakerElement;
    console.log("Tier To modify", tierToModify);
    this.tableDataSource = newData;
  }

  onTierDeleted(tierToDelete: TierMakerElement) {
    let newData = this.tableDataSource.filter( (tierInfo) => {
      return tierInfo.position != tierToDelete.position;
    });
    this.gridDataSource = [...this.gridDataSource, ...tierToDelete.pictures];
    this.tableDataSource = newData.map( (tierInfo, index) => {
      tierInfo.position = index+1;
      return tierInfo;
    });
  }

}
