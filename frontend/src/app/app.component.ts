import { TierListApiService } from './core/services/tier-list-api.service';
import { AuthService } from './core/services/auth.service';
import { SearchService } from './core/services/search.service';
import { ROUTE } from './core/consts/route.const';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TierList } from './core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  tierListItems: Array<TierList> = [];
  resetSearchQuery: boolean = false;

  getViewTitle() {
    if (this.router.url == `/${ROUTE.TierListGrid}`) {
      return 'Listado'
    }
    return 'Detalle'
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

  constructor(
    private router: Router,
    private tierListApiService: TierListApiService,
    private searchService: SearchService,
    private authService: AuthService
  ) {
    this.searchService.needsReset().subscribe(value => this.resetSearchQuery = value);
    this.fetchData();
  }

  private fetchData() {
    this.tierListApiService.getAll().subscribe(data => this.tierListItems = data);
  }
}
