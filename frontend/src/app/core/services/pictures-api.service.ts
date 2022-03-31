import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Category } from '../enums';
import { ApiService } from './api.service';

@Injectable({
	providedIn: 'root'
})
export class PicturesApiService {

  getPictures(category: Category, max?: number): Observable<string[]> {
    return this.apiService.get(`/pictures/${category}?_start=0&_limit=${max}`);
  }

  constructor(private apiService: ApiService) { }
}
