import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TierListPage } from './views/tier-list/tier-list.component';

const routes: Routes = [
  {
    path: '',
    component: TierListPage
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
