import { Category } from './../../core/enums/category.enum';

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { createEmptyTierList, PicturesApiService, TierList, TierListApiService } from 'src/app/core';
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

  onPictureDroppped(event: CdkDragDrop<string[]>) {
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
