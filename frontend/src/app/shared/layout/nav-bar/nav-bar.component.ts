import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'nav[tier-nav-bar]',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  @Output() logout: EventEmitter<any> = new EventEmitter();

  onAddNewTierListButtonClicked() {
    console.log('Add new tier list!');
  }

  onLogoutButtonClicked() {
    this.logout.emit();
  }

}
