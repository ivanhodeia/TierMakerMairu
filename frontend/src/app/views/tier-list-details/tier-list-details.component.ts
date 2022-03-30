import { Category } from './../../core/enums/category.enum';

import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { createEmptyTierList, PicturesApiService, TierList, TierListApiService } from 'src/app/core';

@Component({
  selector: 'div[tier-list-details]',
  templateUrl: './tier-list-details.component.html',
  styleUrls: ['./tier-list-details.component.scss']
})
export class TierListDetailsPage {
  tierList: TierList = createEmptyTierList();
  pictures: Array<string> = [];


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
