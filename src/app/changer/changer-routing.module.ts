import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangerPage } from './changer.page';

const routes: Routes = [
  {
    path: '',
    component: ChangerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangerPageRoutingModule {}
