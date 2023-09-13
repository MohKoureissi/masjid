import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ListMosqueePage } from './list-mosquee.page';

const routes: Routes = [
  {
    path: '',
    component: ListMosqueePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListMosqueePageRoutingModule {}
