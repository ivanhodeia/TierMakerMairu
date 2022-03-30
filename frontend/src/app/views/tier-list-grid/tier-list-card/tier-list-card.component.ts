import { TierList } from './../../../core/models/tier-list.model';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: '[tier-list-card]',
  templateUrl: './tier-list-card.component.html',
  styleUrls: ['./tier-list-card.component.scss']
})
export class TierListCardComponent {
  @Input() tierList!: TierList;
  @Output() editButtonClick: EventEmitter<any> = new EventEmitter();
  @Output() removeButtonClick: EventEmitter<any> = new EventEmitter();
  @Output() toggleFavoriteValueButtonClick: EventEmitter<any> = new EventEmitter();

  onRemoveButtonClicked() {
    this.editButtonClick.emit();
  }

  onEditButtonClicked() {
    this.removeButtonClick.emit();
  }

  onToggleFavoriteValueButtonClicked() {
    this.toggleFavoriteValueButtonClick.emit();
  }
}
