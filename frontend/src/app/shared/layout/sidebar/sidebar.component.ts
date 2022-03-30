import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { TierList } from 'src/app/core';

@Component({
  selector: 'div[tier-sidebar]',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent {
  @Input() tierListItems: Array<TierList> = [];
  @Output() elementSelect: EventEmitter<any> = new EventEmitter();

  onElementSelected(event: MatSelectChange) {
    this.elementSelect.emit(event);
  }
}
