import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  canActivate(): Observable<boolean> {
    return this.authService.isAuthenticated;
  }

  constructor(private authService: AuthService) {}
}
