import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { tierListToCardJSON, TierList } from '../models/tier-list.model';

const TIER_LIST_LIST = [
  {
    id: '1',
    name: 'chachi Tier List',
    description: 'La Tier List guachi',
    tiers: [
      {id: '1', color:'#ff8d00e6', name: '<3', pictures: ['https://robohash.org/mandarina', 'https://robohash.org/tng']},
      {id: '2', color:'#ff0000', name: 'Hydrogen', pictures: ['https://robohash.org/1d', 'https://robohash.org/1dxd']},
      {id: '3', color:'#00ffd5', name: 'Lithium', pictures: ['https://robohash.org/13d']},
      {id: '4', color:'#14FF00', name: 'Beryllium', pictures: ['https://robohash.org/1ddsds']},
    ],
    unassignedImages: [
      'https://robohash.org/1d', 'https://robohash.org/1d1',
      'https://robohash.org/1d3', 'https://robohash.org/1d4',
      'https://robohash.org/1d5', 'https://robohash.org/1d6',
      'https://robohash.org/1d7', 'https://robohash.org/1d8',
      'https://robohash.org/1d9', 'https://robohash.org/1d10',
    ]
  },
];
@Component({
  selector: 'app-tier-list-list',
  templateUrl: './tier-list-list.component.html',
  styleUrls: ['./tier-list-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class TierListListComponent {
  tierLists: Array<TierList> = new Array<TierList>();
  filteredLists: Array<TierList> = new Array<TierList>();
  filterValue: string = '';

  constructor(){
    this.tierLists = TIER_LIST_LIST;
    this.filterTierLists();
  }

  tierListToCardJSON(tierListInfo: TierList): any {
    return tierListToCardJSON(tierListInfo);
  }

  private filterTierLists(): void {
    this.filteredLists = this.tierLists.filter( (tierListInfo) => {
      return tierListInfo.name.toLowerCase().includes(this.filterValue)
            || tierListInfo.description.toLowerCase().includes(this.filterValue);
    });
  }

}
