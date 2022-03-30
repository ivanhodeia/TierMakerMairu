import { SnackbarAction } from './../../core/enums/snackbar-action.enum';
import { TierListApiService } from './../../core/services/tier-list-api.service';
import { SearchService } from './../../core/services/search.service';
import { Component } from '@angular/core';
import { TierList } from 'src/app/core';
import { tap } from 'rxjs/operators';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Observable } from 'rxjs';

@Component({
  selector: 'div[tier-list-grid]',
  templateUrl: './tier-list-grid.component.html',
  styleUrls: ['./tier-list-grid.component.scss']
})
export class TierListGridPage {
  filterByFav: boolean = false;
  querySearch: string = '';
  filteredTierListItems: Array<TierList> = [];

  onEditCardButtonClicked(tierList: TierList) {
    console.log('Edit button clicked!');
  }

  onRemoveCardButtonClicked(tierList: TierList) {
    this.tierListApiService.delete(tierList)
      .pipe(tap({next: () => {
        this.fetchData();
        this.searchService.resetSearchQuery();
      }})).subscribe();
  }

  onToggleFavoriteValueButtonClicked(tierList: TierList) {
    tierList.favorite = !tierList.favorite;
    this.tierListApiService.saveOrUpdate(tierList)
      .pipe(tap({
        error: () => tierList.favorite = !tierList.favorite,
        next: () => this.fetchData()
      }))
      .subscribe()
  }

  onTabClicked(event: MatTabChangeEvent) {
    this.filterByFav = event.index == 1;
    this.searchService.resetSearchQuery();
    this.filteredTierListItems = this.getFilteredTierListItems();
  }

  private tierListItems: Array<TierList> = [];

  constructor(
    private searchService: SearchService,
    private tierListApiService: TierListApiService
  ) {
    this.searchService.getSearchQuery().subscribe(data => {
      this.querySearch = data;
      this.filteredTierListItems = this.getFilteredTierListItems();
    });
    this.fetchData();
  }

  private fetchData() {
    this.tierListApiService.getAll().subscribe(data => {
      this.tierListItems = data;
      this.filteredTierListItems = this.getFilteredTierListItems();
    });
  }

  private getFilteredTierListItems() {
    let copy = JSON.parse(JSON.stringify(this.tierListItems));
    if (this.querySearch == '' && !this.filterByFav) {
      return copy
    } else {
      let lwCaseQueryString = this.querySearch.toLocaleLowerCase();
      return copy.filter(elem => {
        let formattedElem = this.getStringifiedLwCaseObjectValues(elem);
        return this.filterByFav
          ? formattedElem.includes(lwCaseQueryString) && elem.favorite
          : formattedElem.includes(lwCaseQueryString);
      })
    }
  }

  private getStringifiedLwCaseObjectValues(obj: any) {
    return Object.values(obj).join(' ').toLocaleLowerCase();
  }
}
