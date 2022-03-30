import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map, tap } from 'rxjs/operators';
import { TierList } from '../models/tier-list.model';
import { ApiService } from './api.service';

@Injectable({
	providedIn: 'root'
})
export class TierListApiService {
  private allCachedSubject = new BehaviorSubject<TierList[] | null>(null);
  public allCached = this.allCachedSubject.asObservable().pipe(distinctUntilChanged());

  private isFirstCall: boolean = true;

  getAll(): Observable<TierList[]> {
    if (this.isFirstCall) {
      this.updateCachedAll();
    }
    return this.allCached;
  }

  private updateCachedAll() {
    this.apiService.get('/tierlists')
      .pipe(tap({
        next: (data: TierList[]) => {
          this.isFirstCall = false;
          this.allCachedSubject.next(data)
        },
        error: () => {
          this.isFirstCall = true;
          this.allCachedSubject.next(null);
        }
      })).subscribe();
  }

  getById(id: string): Observable<TierList> {
    return this.apiService.get(`/tierlists/${id}`);
  }

  saveOrUpdate(tierList: TierList): Observable<any> {
    return this.apiService.put(`/tierlists/${tierList.id}`, tierList)
      .pipe(tap({next: () => this.updateCachedAll()}));
  }

  delete(tierList: TierList): Observable<any> {
    return this.apiService.delete(`/tierlists/${tierList.id}`)
      .pipe(tap({next: () => this.updateCachedAll()}));
  }

  constructor(private apiService: ApiService) { }
}
