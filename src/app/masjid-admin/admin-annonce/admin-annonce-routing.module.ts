import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminAnnoncePage } from './admin-annonce.page';

const routes: Routes = [
  {
    path: '',
    component: AdminAnnoncePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminAnnoncePageRoutingModule {}
