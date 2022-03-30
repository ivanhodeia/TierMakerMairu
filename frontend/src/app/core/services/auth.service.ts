import { ROUTE } from './../consts/route.const';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';
import { User } from '../models';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';

const PROFILE_URL = '/auth/profile';
const LOGIN_URL = '/auth/login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User>({} as User);
  public currentUser = this.currentUserSubject.asObservable().pipe(distinctUntilChanged());

  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated = this.isAuthenticatedSubject.asObservable();

  /**
   * Recupera la información del usuario si hay un token almacenado.
   */
  init() {
    const token = this.jwtService.getToken();
    token ? this.getUserProfile(token) : this.goToLoginPage();
  }

  private getUserProfile(token): void {
    this.apiService.get(PROFILE_URL)
      .subscribe({
        next: data => this.onAuthSuccess(token, data),
        error: error => this.onAuthError(error)
      });
  }

  /**
   * Obtiene el perfil de usuario y el token.
   */
  login(email: string, password: string) {
    let successSubject = new BehaviorSubject<boolean>(true);
    let success = successSubject.asObservable().pipe(distinctUntilChanged());
    this.apiService.post(LOGIN_URL, { email, password })
      .subscribe({
        next: (data) => this.onAuthSuccess(data.accessToken, data.user),
        error: (error) => { this.onAuthError(error); successSubject.next(false); }
      });
    return success;
  }

  /**
   * Elimina toda la información referente al usuario logueado y el token.
   */
  logout() {
    this.currentUserSubject.next({} as User);
    this.isAuthenticatedSubject.next(false);
    this.goToLoginPage();
  }

  /**
   * Elimina toda la información referente al usuario logueado y el token.
   */
  isUserAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  private onAuthSuccess(token: string, user: User) {
    console.log('[INFO] Perfil de usuario: ', user);
    this.jwtService.saveToken(token);
    this.currentUserSubject.next(user);
    this.isAuthenticatedSubject.next(true);
    this.goToCurrentPage();
  }

  private onAuthError(error: any) {
    console.log('[ERROR] Ha habido un error en el login: ', error);
    this.jwtService.destroyToken();
    this.currentUserSubject.next({} as User);
    this.isAuthenticatedSubject.next(false);
    this.goToLoginPage();
  }

  private goToCurrentPage() {
    this.router.initialNavigation();
    let pathname = window.location.pathname;
    if (pathname == '/') {
      this.router.navigate([`./${ROUTE.TierListGrid}`]);
    } else {
      this.router.navigate([`.${pathname}`]); // Te redirige a la página que haya escrito el usuario en el navegador.
    }
  }

  private goToLoginPage() {
    this.router.navigate([`./${ROUTE.Login}`]);
  }

  constructor(
    private router: Router,
    private apiService: ApiService,
    private jwtService: JwtService
  ) { }
}
