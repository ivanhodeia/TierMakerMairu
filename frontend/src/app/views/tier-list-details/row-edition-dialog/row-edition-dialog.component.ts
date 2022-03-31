import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'div[row-edition-dialog]',
  templateUrl: './row-edition-dialog.component.html',
  styleUrls: ['./row-edition-dialog.component.scss']
})
export class RowEditionDialogComponent {
  isInvalid() {
    return this.data.color == '' || this.data.label == '';
  }

  constructor(
    public dialogRef: MatDialogRef<RowEditionDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { color: string, label: string },
  ) {}
}
