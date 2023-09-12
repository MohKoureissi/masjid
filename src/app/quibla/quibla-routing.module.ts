import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuiblaPage } from './quibla.page';

const routes: Routes = [
  {
    path: '',
    component: QuiblaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuiblaPageRoutingModule {}
