import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InscrirePage } from './inscrire.page';

const routes: Routes = [
  {
    path: '',
    component: InscrirePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InscrirePageRoutingModule {}
