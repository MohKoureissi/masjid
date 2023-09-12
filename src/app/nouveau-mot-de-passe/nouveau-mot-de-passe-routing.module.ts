import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NouveauMotDePassePage } from './nouveau-mot-de-passe.page';

const routes: Routes = [
  {
    path: '',
    component: NouveauMotDePassePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NouveauMotDePassePageRoutingModule {}
