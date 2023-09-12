import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DonsPage } from './dons.page';

const routes: Routes = [
  {
    path: '',
    component: DonsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DonsPageRoutingModule {}
