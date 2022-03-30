import { SearchService } from './../../../core/services/search.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'header[tier-main-header]',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss']
})
export class MainHeaderComponent {
  @Input() title: string = '';
  @Input() hasSearch: boolean = true;
  @Input() reset: boolean = false;
  @Output() inputSubmit: EventEmitter<any> = new EventEmitter()

  queryString = '';

  onInputSubmitted() {
    this.inputSubmit.emit(this.queryString);
  }

  ngOnChanges() {
    if (this.reset) {
      this.queryString = '';
      this.inputSubmit.emit(this.queryString);
    }
  }
}
