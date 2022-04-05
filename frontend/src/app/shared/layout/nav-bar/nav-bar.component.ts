import { ROUTE } from 'src/app/core';
import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'nav[tier-nav-bar]',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent {
  @Output() logoClick: EventEmitter<any> = new EventEmitter();

  onLogoClicked() {
    this.logoClick.emit();
  }
}
