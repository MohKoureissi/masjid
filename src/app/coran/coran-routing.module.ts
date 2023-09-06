import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoranPage } from './coran.page';

const routes: Routes = [
  {
    path: '',
    component: CoranPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CoranPageRoutingModule {}
