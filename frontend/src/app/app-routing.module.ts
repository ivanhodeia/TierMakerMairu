import { APP_INITIALIZER, NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, AuthService, ROUTE, TokenInterceptor } from './core';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LoginPage, TierListGridPage } from './views';


const routes: Routes = [
  {
    path: ROUTE.Login,
    component: LoginPage
  },
  {
    path: ROUTE.TierListGrid,
    component: TierListGridPage,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: LoginPage
  }
  // {
  //   path: ROUTE.TierListDetails(),
  //   component: NotificationsPage,
  //   canActivate: [AuthGuard],
  // },
];

export function authInitializer(authService: AuthService) {
  return () => authService.init();
}

@NgModule({
  imports: [
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: APP_INITIALIZER,
      useFactory: authInitializer,
      multi: true,
      deps: [AuthService]
    },
    AuthGuard
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
