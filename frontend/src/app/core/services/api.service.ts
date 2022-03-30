import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

@Injectable({
	providedIn: 'root'
})
export class ApiService {
	get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
		return this.http.get(`${environment.API_URL}${path}`, { params: params, headers: HEADERS })
      .pipe(
        tap(() => console.log('GET: ', path)),
      );
	}

	put(path: string, body: any = {}): Observable<any> {
		return this.http.put(
			`${environment.API_URL}${path}`,
			JSON.stringify(body),
      { headers: HEADERS }
		);
	}

	post(path: string, body: any = {}): Observable<any> {
		return this.http.post(
			`${environment.API_URL}${path}`,
			JSON.stringify(body),
      { headers: HEADERS }
		);
	}

	delete(path: string): Observable<any> {
		return this.http.delete(
			`${environment.API_URL}${path}`,
      { headers: HEADERS }
		);
	}

  constructor(private http: HttpClient) {}
}
