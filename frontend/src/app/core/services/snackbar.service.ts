import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { distinctUntilChanged } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarAction } from '../enums';

@Injectable({
	providedIn: 'root'
})
export class SnackbarService {
  private newSubject = new BehaviorSubject<boolean>(false);
  public new = this.newSubject.asObservable().pipe(distinctUntilChanged());

  private message: string = '';
  private action: SnackbarAction = SnackbarAction.Confirm;

  open(): void {
    this._snackBar.open(this.message, this.action);
  }

  setInfo(message: string, action: SnackbarAction) {
    this.message = message;
    this.action = action;
    this.newSubject.next(true);
    setTimeout(() => this.newSubject.next(false), 100);
  }

  constructor(private _snackBar: MatSnackBar) {}
}
