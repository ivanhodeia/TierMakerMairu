import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { distinctUntilChanged } from 'rxjs/operators';

@Injectable({
	providedIn: 'root'
})
export class SearchService {
  private querySubject = new BehaviorSubject<string>('');
  public query = this.querySubject.asObservable().pipe(distinctUntilChanged());

  private resetSubject = new BehaviorSubject<boolean>(false);
  public reset = this.resetSubject.asObservable().pipe(distinctUntilChanged());

  getSearchQuery(): Observable<string> {
    return this.query;
  }

  updateSearchQuery(data: string): void {
    this.querySubject.next(data);
  }

  resetSearchQuery(): void {
    this.resetSubject.next(true);
    setTimeout(() => this.resetSubject.next(false), 1000);
  }

  needsReset(): Observable<boolean> {
    return this.reset;
  }
}
