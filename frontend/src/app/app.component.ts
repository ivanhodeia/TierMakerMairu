import { createEmptyTierList } from 'src/app/core';
import { SnackbarService } from './core/services/snackbar.service';
import { TierListApiService } from './core/services/tier-list-api.service';
import { AuthService } from './core/services/auth.service';
import { SearchService } from './core/services/search.service';
import { ROUTE } from './core/consts/route.const';
import { Component, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { TierList } from './core';
import { MatDrawer } from '@angular/material/sidenav';
import { MatDialog } from '@angular/material/dialog';
import { TierListDialogComponent } from './shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('drawer') drawer: MatDrawer;

  tierListItems: Array<TierList> = [];
  resetSearchQuery: boolean = false;

  getViewTitle() {
    if (this.router.url == `/${ROUTE.TierListGrid}`) {
      return 'Listado';
    }
    return 'Detalle';
  }

  hasSearch() {
    if (this.router.url == `/${ROUTE.TierListGrid}`) {
      return true;
    }
    return false;
  }

  onSearchQueryUpdated(query: string) {
    this.searchService.updateSearchQuery(query);
  }

  isLoginRoute() {
    return this.router.url === `/${ROUTE.Login}`;
  }

  isDetailsRoute() {
    console.log(this.router.url);
    return this.router.url.includes('details');
  }

  onLogoutButtonClicked() {
    this.authService.logout();
  }

  onSidebarElementSelected(event: any) {
    let id = event.option.value.id;
    this.router.navigate([`./${ROUTE.TierListDetails}/${id}`]);
  }

  onLogoClicked() {
    this.router.navigate([`./${ROUTE.TierListGrid}`]);
  }

  onAddNewTierListButtonClicked() {
    let newTierList = createEmptyTierList();
    const dialogRef = this.dialog.open(TierListDialogComponent, {
      restoreFocus: false,
      data: { tierList: newTierList, action: 'add' }
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.tierListApiService.save(data.tierList).subscribe()
      }
    });
  }

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private tierListApiService: TierListApiService,
    private searchService: SearchService,
    private snackbarService: SnackbarService,
    private authService: AuthService
  ) {
    this.searchService.needsReset().subscribe(value => this.resetSearchQuery = value);
    this.fetchData();
    this.runNotifications();
    this.setSidebarToggler();
  }

  private fetchData() {
    this.tierListApiService.getAll().subscribe(data => this.tierListItems = data);
  }

  private runNotifications() {
    this.snackbarService.new.subscribe((value) => value ? this.snackbarService.open() : '');
  }

  private setSidebarToggler() {
    this.router.events.subscribe((val) => {
      if (val instanceof NavigationEnd && this.drawer) {
        (this.router.url == `/${ROUTE.TierListGrid}`)
        ? this.drawer.open()
        : this.drawer.close();
      }
    });
  }
}
