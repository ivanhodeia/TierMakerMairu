import { MatDialog } from '@angular/material/dialog';
import { TierListApiService } from './../../core/services/tier-list-api.service';
import { SearchService } from './../../core/services/search.service';
import { Component } from '@angular/core';
import { ROUTE, TierList } from 'src/app/core';
import { tap } from 'rxjs/operators';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { TierListDialogComponent } from 'src/app/shared';

@Component({
  selector: 'div[tier-list-grid]',
  templateUrl: './tier-list-grid.component.html',
  styleUrls: ['./tier-list-grid.component.scss']
})
export class TierListGridPage {
  filterByFav: boolean = false;
  querySearch: string = '';
  filteredTierListItems: Array<TierList> = [];
  hasSearch: boolean = true;

  onEditCardButtonClicked(tierList: TierList) {
    const dialogRef = this.dialog.open(TierListDialogComponent, {
      restoreFocus: false,
      data: { tierList: JSON.parse(JSON.stringify(tierList)), action: 'edit' }
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.tierListApiService.update(data.tierList).subscribe()
      }
    });
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
    this.tierListApiService.update(tierList)
      .pipe(tap({
        error: () => tierList.favorite = !tierList.favorite,
        next: () => this.fetchData()
      }))
      .subscribe()
  }

  onCardClicked(tierList: TierList) {
    this.router.navigate([`/${ROUTE.TierListDetails}/${tierList.id}`]);
  }

  onTabClicked(event: MatTabChangeEvent) {
    this.filterByFav = event.index == 1;
    this.searchService.resetSearchQuery();
    this.filteredTierListItems = this.getFilteredTierListItems();
  }

  private tierListItems: Array<TierList> = [];

  constructor(
    public dialog: MatDialog,
    private searchService: SearchService,
    private tierListApiService: TierListApiService,
    private router: Router
  ) {}

  ngOnInit() {
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
    return JSON.parse(JSON.stringify(this.tierListItems));
  }
}
