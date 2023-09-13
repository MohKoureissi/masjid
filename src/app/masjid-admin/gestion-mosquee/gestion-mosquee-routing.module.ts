import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GestionMosqueePage } from './gestion-mosquee.page';

const routes: Routes = [
  {
    path: '',
    component: GestionMosqueePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GestionMosqueePageRoutingModule {}
