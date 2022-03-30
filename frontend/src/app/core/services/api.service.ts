import { SnackbarAction } from './../enums/snackbar-action.enum';
import { SnackbarService } from './snackbar.service';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';

const HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json'
};

@Injectable({
	providedIn: 'root'
})
export class ApiService {
	get<Type>(path: string, params: HttpParams = new HttpParams()): Observable<Type> {
		return this.http.get(`${environment.API_URL}${path}`, { params: params, headers: HEADERS })
      .pipe(
        tap(() => console.log('GET: ', path)),
        map(data => data as Type)
      );
	}

	put(path: string, body: any = {}): Observable<any> {
		return this.http.put(
			`${environment.API_URL}${path}`,
			JSON.stringify(body),
      { headers: HEADERS }
		).pipe(tap({
        next: () => this.snackbarService.setInfo('Actualizado con éxito', SnackbarAction.Confirm),
        error: () => this.snackbarService.setInfo('No se ha podido actualizar', SnackbarAction.Confirm),
    }));
	}

	post(path: string, body: any = {}): Observable<any> {
    let showNotifications = path.includes('auth/');
		return this.http.post(
			`${environment.API_URL}${path}`,
			JSON.stringify(body),
      { headers: HEADERS }
		).pipe(tap({
      next: () => {
        if (showNotifications) {
          this.snackbarService.setInfo('Actualizado con éxito', SnackbarAction.Confirm);
        }
      },
      error: () => {
        if (showNotifications) {
          this.snackbarService.setInfo('No se ha podido actualizar', SnackbarAction.Confirm);
        }
      }
  }));
	}

	delete(path: string, object?: any): Observable<any> {
    return this.http.delete(
			`${environment.API_URL}${path}`,
      { headers: HEADERS }
		).pipe(tap({
      next: () => this.snackbarService.setInfo('Eliminado con éxito', SnackbarAction.Confirm),
      error: () => this.snackbarService.setInfo('No se ha podido eliminar', SnackbarAction.Confirm),
    }));
	}

  constructor(
    private http: HttpClient,
    private snackbarService: SnackbarService
  ) {}
}
