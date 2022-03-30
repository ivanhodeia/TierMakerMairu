import { ApiService } from './core/services/api.service';
import { SnackbarService } from './core/services/snackbar.service';
import { TierListApiService } from './core/services/tier-list-api.service';
import { AuthService } from './core/services/auth.service';
import { SearchService } from './core/services/search.service';
import { ROUTE } from './core/consts/route.const';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { TierList } from './core';
import { MatDrawer } from '@angular/material/sidenav';

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

  onLogoutButtonClicked() {
    this.authService.logout();
  }

  onSidebarElementSelected(event: any) {
    console.log(event);
    let id = event.option.value.id;
    this.drawer.close();
    this.router.navigate([`./${ROUTE.TierListDetails}/${id}`]);
  }

  onLogoClicked() {
    this.drawer.open();
    this.router.navigate([`./${ROUTE.TierListGrid}`]);
  }

  constructor(
    private router: Router,
    private tierListApiService: TierListApiService,
    private searchService: SearchService,
    private snackbarService: SnackbarService,
    private authService: AuthService
  ) {
    this.searchService.needsReset().subscribe(value => this.resetSearchQuery = value);
    this.fetchData();
    this.runNotifications();
  }

  private fetchData() {
    this.tierListApiService.getAll().subscribe(data => this.tierListItems = data);
  }

  private runNotifications() {
    this.snackbarService.new.subscribe((value) => value ? this.snackbarService.open() : '');
  }
}
