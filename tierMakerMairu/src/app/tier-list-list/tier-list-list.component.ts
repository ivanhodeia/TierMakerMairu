import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';
import { TierList } from '../models/tier-list.model';

@Component({
  selector: '[tier-list-list]',
  templateUrl: './tier-list-list.component.html',
  styleUrls: ['./tier-list-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TierListListComponent {
  tierLists: Array<TierList> = new Array<TierList>();
  filteredLists: Array<TierList> = new Array<TierList>();


}
