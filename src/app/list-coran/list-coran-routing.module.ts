import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListCoranPage } from './list-coran.page';

const routes: Routes = [
  {
    path: '',
    component: ListCoranPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListCoranPageRoutingModule {}
