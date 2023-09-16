import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OublierPage } from './oublier.page';

const routes: Routes = [
  {
    path: '',
    component: OublierPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OublierPageRoutingModule {}
