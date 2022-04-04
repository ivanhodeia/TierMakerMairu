import { Category } from './../../core/enums/category.enum';

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { createEmptyTierItem, createEmptyTierList, PicturesApiService, TierList, TierListApiService } from 'src/app/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { RowEditionDialogComponent } from './row-edition-dialog/row-edition-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { TierListDialogComponent } from 'src/app/shared';

const PICTURES_CONTAINER_ID = 'pictures-list';
@Component({
  selector: 'div[tier-list-details]',
  templateUrl: './tier-list-details.component.html',
  styleUrls: ['./tier-list-details.component.scss']
})
export class TierListDetailsPage {
  editDescription: boolean = false;
  tierList: TierList = createEmptyTierList();
  pictures: Array<string> = [];

  getAllIds() {
    return [...this.tierList.items.map(elem => elem.id), PICTURES_CONTAINER_ID];
  }

  getPicturesContainerId() {
    return PICTURES_CONTAINER_ID;
  }

  onPictureDropped(event: CdkDragDrop<string[]>) {
    console.log(event);
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
    this.tierList.items.push(createEmptyTierItem());
  }

  onRemoveButtonClicked(index: number) {
    this.tierList.items = this.tierList.items.filter((_, currentIndex) => index != currentIndex);
  }

  onEditButtonClicked(index: number) {
    const dialogRef = this.dialog.open(RowEditionDialogComponent, {
      restoreFocus: false,
      data: { color: this.tierList.items[index].color, label: this.tierList.items[index].text }
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.tierList.items[index].color = data.color;
        this.tierList.items[index].text = data.label;
      }
    });
  }

  onSaveChangesButtonClicked() {
    this.tierListApiService.update(this.tierList).subscribe();
  }

  onEditFullTierListButtonClicked() {
    const dialogRef = this.dialog.open(TierListDialogComponent, {
      restoreFocus: false,
      data: { tierList: JSON.parse(JSON.stringify(this.tierList)), action: 'edit' }
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.tierListApiService.update(data.tierList).subscribe()
      }
    });
  }

  constructor(
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private picturesApiService: PicturesApiService,
    private tierListApiService: TierListApiService
  ) {
    this.route.params.subscribe(params => {
      let id = params['id'];
      this.fetchTierList(id);
    })
  }

  private fetchTierList(id: string) {
    this.tierListApiService.getById(id)
    .subscribe(data => {
      this.tierList = data;
      if (this.tierList.category) {
        let currentNPictures = this.tierList.items.reduce((prev, item) => prev + item.pictures.length, 0);
        let pendingPictures = this.tierList.nPictures - currentNPictures;
        this.fetchPictures(this.tierList.category, pendingPictures);
      } else {
        this.pictures = this.tierList.pictures;
      }
    });
  }

  private fetchPictures(category: Category, n: number) {
    this.picturesApiService.getPictures(category, n)
      .subscribe(data => this.pictures = data);
  }
}
