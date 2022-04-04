import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, ROUTE } from './core';
import { LoginPage, TierListDetailsPage, TierListGridPage } from './views';


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
    path: ROUTE.TierListDetails,
    component: TierListDetailsPage,
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: LoginPage
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { initialNavigation: 'disabled' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
