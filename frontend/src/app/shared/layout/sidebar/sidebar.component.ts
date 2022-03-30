import { Component, Input } from '@angular/core';
import { TierList } from 'src/app/core';

@Component({
  selector: 'div[tier-sidebar]',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() tierListItems: Array<TierList> = [];

  onAddNewTierListButtonClicked() {
    console.log('Add new tier list!');
  }

}
