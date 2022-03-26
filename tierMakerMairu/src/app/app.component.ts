import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { Component, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { getEmptyTierMakerElement, TierMakerElement } from './models/tier-maker-element.model';
import { TierModalComponent } from './tier-modal/tier-modal.component';

const TIER_MAKER_DATA: TierMakerElement[] = [
  {id: '1', color:'#ff8d00e6', name: '<3', pictures: ['https://robohash.org/mandarina', 'https://robohash.org/tng']},
  {id: '2', color:'#ff0000', name: 'Hydrogen', pictures: ['https://robohash.org/1d', 'https://robohash.org/1dxd']},
  {id: '3', color:'#00ffd5', name: 'Lithium', pictures: ['https://robohash.org/13d']},
  {id: '4', color:'#14FF00', name: 'Beryllium', pictures: ['https://robohash.org/1ddsds']},
  // {position: 5, name: 'Boron', pictures: ['https://robohash.org/1dfdsf']},
  // {position: 6, name: 'Carbon', pictures: ['https://robohash.org/1ddsd']},
  // {position: 7, name: 'Nitrogen', pictures: ['https://robohash.org/1dsdf']},
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
  selectedIndex: number = -1;
  
  constructor(public dialog: MatDialog) {}

  getAllListIds() {
    let l = [this.picturesGridId];
    for (let element of this.tableDataSource) {
      l.push(element.id);
    }
    return l;
  }
  //           |
  //Je je mira v
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

  onAddMoreImagesButtonClicked() {
    //TODO: Llamar al servicio para añadir más imágenes
  }

  onClearAllButtonClicked() {
    let newGridData = [...this.gridDataSource];
    this.tableDataSource.forEach( (tierInfo) => {
      newGridData = [...newGridData, ...tierInfo.pictures];
      tierInfo.pictures = [];
    });
    this.gridDataSource = newGridData;
    this.tableDataSource = [...this.tableDataSource];
  }

  onFillTiersRandomlyButtonClicked() {
    let picturesToAdd = this.gridDataSource;
    picturesToAdd.forEach( (pictureUrl) => {
      let tierIndex = Math.floor(Math.random() * ( this.tableDataSource.length - 0));
      this.tableDataSource[tierIndex].pictures.push(pictureUrl);
    });
    this.gridDataSource = [];
    this.tableDataSource = [...this.tableDataSource];
  }

  onAddTierButtonClicked() {
    this.selectedTier = getEmptyTierMakerElement();
    this.selectedIndex = -1;
    this.openDialog();
  }

  onEditTierButtonClicked(selectedId: string) {
    let selectedIndex = this.tableDataSource.findIndex( (tierInfo) => {
      return tierInfo.id === selectedId;
    });
    let currentTier = this.tableDataSource[selectedIndex];
    if(currentTier){
      this.selectedIndex = selectedIndex;
      this.selectedTier = {...currentTier};
      this.openDialog();
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(TierModalComponent, {
      data: {
        tierToEdit: this.selectedTier,
        isEdit: this.selectedIndex != -1,
      }
    });
  
    dialogRef.afterClosed().subscribe( (result) => {
      if(result.data){
        let currentTier = result.data;
        if(result.isDelete){
          this.deleteTier(currentTier, this.selectedIndex);
        }
        else if(result.isClearImages){
          this.clearImages(currentTier, this.selectedIndex);
        }
        else{
          if(this.selectedIndex == -1){
            this.addNewTier(currentTier);
          }
          else{
            this.editExistingTier(currentTier, this.selectedIndex);
          }
        }
      }
    });
  }

  onSwapUp(selectedId: string) {
    let index = this.tableDataSource.findIndex( (tierInfo) => {
      return tierInfo.id === selectedId;
    });
    let currentTier = this.tableDataSource[index];
    let otherTier = this.tableDataSource[index-1];
    this.swapTwoTierInfo(currentTier, otherTier);
  }

  onSwapDown(selectedId: string) {
    let index = this.tableDataSource.findIndex( (tierInfo) => {
      return tierInfo.id === selectedId;
    });
    let currentTier = this.tableDataSource[index];
    let otherTier = this.tableDataSource[index+1];
    this.swapTwoTierInfo(currentTier, otherTier);
  }

  private swapTwoTierInfo(tierA: TierMakerElement, tierB: TierMakerElement): void {
    let tmpName = tierA.name;
    let tmpColor = tierA.color;
    let tmpPictures = tierA.pictures;
    tierA.name = tierB.name;
    tierA.color = tierB.color;
    tierA.pictures = tierB.pictures;
    tierB.name = tmpName;
    tierB.color = tmpColor;
    tierB.pictures = tmpPictures;
  }

  private clearImages(tierToClear: TierMakerElement, index: number) {
    this.gridDataSource = [...this.gridDataSource, ...tierToClear.pictures];
    tierToClear.pictures = [];
    let newData = [...this.tableDataSource];
    newData[index] = {...tierToClear} as TierMakerElement;
    this.tableDataSource = newData;
  }

  private addNewTier(tierToAdd: TierMakerElement) {
    let newData = [...this.tableDataSource];
    newData.push(tierToAdd);
    this.tableDataSource = newData;
  }

  private editExistingTier(tierToModify: TierMakerElement, index: number) {
    let newData = [...this.tableDataSource];
    newData[index] = {...tierToModify} as TierMakerElement;
    this.tableDataSource = newData;
  }

  private deleteTier(tierToDelete: TierMakerElement, index: number) {
    let newData = this.tableDataSource.slice();
    newData.splice(index, 1);
    this.gridDataSource = [...this.gridDataSource, ...tierToDelete.pictures];
    this.tableDataSource = [...newData];
  }
}
