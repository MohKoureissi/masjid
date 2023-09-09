import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListPrechePage } from './list-preche.page';

const routes: Routes = [
  {
    path: '',
    component: ListPrechePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListPrechePageRoutingModule {}
