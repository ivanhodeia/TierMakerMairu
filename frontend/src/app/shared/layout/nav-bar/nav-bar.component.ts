import { ROUTE } from 'src/app/core';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'nav[tier-nav-bar]',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  @Output() logout: EventEmitter<any> = new EventEmitter();
  @Output() logoClick: EventEmitter<any> = new EventEmitter();
  @Output() addNewTierList: EventEmitter<any> = new EventEmitter();

  onAddNewTierListButtonClicked() {
    this.addNewTierList.emit();
  }

  onLogoutButtonClicked() {
    this.logout.emit();
  }

  onLogoClicked() {
    this.logoClick.emit();
  }
}
