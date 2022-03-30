import { Category } from './../../core/enums/category.enum';

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { createEmptyTierItem, createEmptyTierList, PicturesApiService, TierList, TierListApiService } from 'src/app/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

const PICTURES_CONTAINER_ID = 'pictures-list';
@Component({
  selector: 'div[tier-list-details]',
  templateUrl: './tier-list-details.component.html',
  styleUrls: ['./tier-list-details.component.scss']
})
export class TierListDetailsPage {
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

  onClearAllButtonClicked() {
    let data = [...this.pictures];
    this.tierList.items.forEach((item) => {
      data = [...data, ...item.pictures];
      item.pictures = [];
    });
    this.pictures = data;
  }

  onFillTiersRandomlyButtonClicked() {
    this.pictures.forEach((url) => {
      let tierIndex = Math.floor(Math.random() * (this.tierList.items.length - 0));
      this.tierList.items[tierIndex].pictures.push(url);
    });
    this.pictures = [];
  }

  onAddTierButtonClicked() {
    this.tierList.items.push(createEmptyTierItem());
  }

  onMoveUpButtonClicked(index: number) {
    console.log('up ', index);
    if (index - 1 != this.tierList.items.length - 1) {
      moveItemInArray(this.tierList.items, index, index - 1);
    }
  }

  onMoveDownButtonClicked(index: number) {
    if (index + 1 != 0) {
      moveItemInArray(this.tierList.items, index, index + 1);
    }
  }

  constructor(
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
      this.fetchPictures(this.tierList.category, this.tierList.nPictures);
    });
  }

  private fetchPictures(category: Category, n: number) {
    this.picturesApiService.getPictures(category, n)
      .subscribe(data => {this.pictures = data; console.log(data)});
  }
}
