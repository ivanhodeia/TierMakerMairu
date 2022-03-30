import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TierList } from '../models/tier-list.model';
import { ApiService } from './api.service';

@Injectable({
	providedIn: 'root'
})
export class TierListApiService {
  getAll(): Observable<TierList[]> {
    return this.apiService.get('/tierlists');
  }

  getById(tierList: TierList): Observable<TierList[]> {
    return this.apiService.get(`/tierlists/${tierList.id}`);
  }

  saveOrUpdate(tierList: TierList): Observable<any> {
    return this.apiService.put(`/tierlists/${tierList.id}`, tierList);
  }

  delete(tierList: TierList): Observable<any> {
    return this.apiService.delete(`/tierlists/${tierList.id}`);
  }

  constructor(private apiService: ApiService) { }
}
